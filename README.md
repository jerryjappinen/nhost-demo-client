# nhost-demo-client

This demo app showcases a simple integration with an [Nhost](https://nhost.io/) backend. In this demo:

- Upload and remove files
- Sign in a new or existing user
- Create, read, update and delete data with GraphQL
- Display preview images using server-side image transformations

# Frontend

Recommended node version is 14 LTS or 16 LTS.

### Commands

```sh
# Install dependencies
npm install
```

```sh
# Start project locally
npm run serve

# Start project locally
# Connects to the development backend running on localhost
npm run serve:local

# Build static app
npm run build

# Lint and test
npm run lint
npm run test
npm run test:watch
```

`vue.config.js` defines some parts of the build process that impact the app. See [Vue CLI configuration reference](https://cli.vuejs.org/config/) for more details. You can also override environment variables locally by adding an `.env.local` file to the project.

---


# Server setup

This app interacts with a backend on Nhost. This repo includes the backend setup that can be run either locally or on [nhost.io](https://nhost.io).

### Cloud environment

First, go to GitHub and [fork this repository](https://github.com/jerryjappinen/nhost-demo-client).

Then, sign up for free on [nhost.io](https://app.nhost.io). Once you're logged in, create a new App on any region of your choice.

After creating the app, press _Connect to GitHub_, and pick your fork of this repository. Nhost will then deploy this app.

Add the backend URL as an environment variable (`VUE_APP_NHOST_BACKEND_URL`) or edit `src/config.js` to connect to your new backend.

### Local development environment

To run the backend in a local development environment:

1. Install [Nhost CLI](https://docs.nhost.io/platform/nhost/local-development)
2. Install [Docker](https://docker.io) and make sure it's running
3. Run `nhost dev` in terminal

The CLI will start the development environment and show you where it's running. Add this backend URL as an environment variable (`VUE_APP_NHOST_BACKEND_URL`) or edit `src/config.js` to connect to your new backend.

---


# Server setup (manual)

If you want to set things up manually, or just understand how the setup process is done, follow these steps after creating a new Nhost app:

### 1. Enable authentication

This app uses passwordless login, which is enabled for new apps by default. You shouldn't have to change any settings for a new app on Nhost.

Authentication methods can be found under **Users** ??? **Login settings**.

### 2. Define Schema

First, add a new table called `uploads` into the `public` schema. Add the following fields:

- Frequently used columns: `id` (UUID) and `created_at` (timestamp)
- A new field called `owner_user_id` (UUID)

Then, define relationships:

- From `files` to `uploads`
  - Go to `files` table
  - Under "Modify"
    - Add a column `upload_id` (UUID, NULLABLE)
    - Add a *foreign key* to `public.uploads` (`upload_id` ??? `id`)
  - Under "Relationships", add the suggested *Object relationship* to `uploads`
  - Also go and add the reverse relationships in `uploads` (array)
- From `uploads` to `users`
  - Go to `uploads` table
  - Under "Modify"
    - You should see the column `owner_user_id` (UUID)
    - Add a *foreign key* to `auth.users` (`owner_user_id` ??? `id`)
    - Under "Relationships", add the suggested *Object relationship* to `users`
  - Also go and add the reverse relationships in `users` (array)

### 3. Permissions

All authenticated requests will be made with the role `user`. You have to add it when editing permissions for the first time.

In the `users` table:

- I want to query my own data. For `user` role's `select` permission:
  - Row select permissions: `{"id":{"_eq":"X-Hasura-User-Id"}}`
  - Column select permissions: "Toggle all"

In `uploads` table:

- I want to create new `upload` objects, if I'm authenticated and my user exists. Add `insert` permission:
  - Row insert permissions: "Without any checks"
  - Column insert permissions: "Toggle all"
- I want to read `uploads` whose owner is me. Add `select` permission
  - Row select permissions: `{"owner_user_id":{"_eq":"X-Hasura-User-Id"}}`
  - Column select permissions: "Toggle all"
- I want to change the owner of `uploads` whose current owner is me. Add `update` permission
  - Row update permissions: "Same as select"
  - Column update permissions: `owner_user_id`
- I want remove `uploads` whose owner is me. Add `delete` permission
  - Row remove permissions: "Same as select, pre update"

In `files` table:

- I want to upload files if I have an account and am logged in. Add `insert` permission:
  - Row insert permissions: "Without any checks"
  - Column insert permissions: "Toggle all"
- I want to read files that are in `uploads` whose owner is me. Add `select` permission:
  - Row select permissions: `{"_or":[{"upload":{"owner_user_id":{"_eq":"X-Hasura-User-Id"}}},{"uploaded_by_user_id":{"_eq":"X-Hasura-User-Id"}}]}`
  - Column select permissions: "Toggle all"
- I want to update the `upload_id` of files. Add `update` permission:
  - Row update permissions: "Same as select"
  - Column update permissions: `upload_id`
- I want to remove files. Add `delete` permission:
  - Row remove permissions: "Same as select, pre update"

We also want files to have viewable link, but not let them be queryable without authorisation. This can be achieved using the `public` role:

- Go to `files` and "Permissions"
- Add a new role called `public`, and add these `select` permissions
  - Row select permissions: "Without any checks"
  - *Limit number of rows* to `0`
  - Column select permissions: "Toggle all"

### 4. `files.createdBy`

If we upload a file, we want the backend to automatically create a reference to the user who uploaded the file. We need to tell Hasura to do this, it's not enabled by default.

- Go to the `files` table
- Select "permissions"
- Select the `user` role's `insert` permissions
- Scroll down and click "Column presets"
- Select `uploaded_by_user_id` ??? from session variable ??? `X-Hasura-User-Id`

### 5. Event triggers

It's common to trigger behavior whenever an object is created or deleted, for example. In this app, we want to write an entry into a `logs` table every time an `Upload` is created. This can be achieved using *Events* and *Functions*.

First, let's create a place for our logs:

- Create a table called `logs` (under `public`) with the following columns:
  - `id` (UUID, primary key)
  - `message` (String)
  - `user_id` (UUID, nullable)
  - `data` (JSONB, nullable)
- Create "Foreign key":
  - From `user_id` ??? `auth.users.id`
- Create relationship:
  - Add the suggested object relationship (`logs.user_id` ??? `users.id`)

Since we will write `logs` as an admin, we don't need to set any permissions.

We must first create an event trigger. In Hasura Console, go to "Events":

- Click on *Create*
  - Trigger name: "onUploadsInsert"
  - Database table: `default` ??? `public.uploads`
  - Trigger opetation: On table `insert`
  - Webhook URL: `{{NHOST_BACKEND_URL}}/v1/functions/triggers/onUploadsInsert`
- Under "Advanced", add a header:
  - Key: `nhost-webhook-secret`
  - Value: change `Value` to 'From env var`
  - Enter `NHOST_WEBHOOK_SECRET`
- Click "Create Event Trigger"

Now, after the event has been created, Hasura will send a POST request to the URL you defined. Because we have the corresponding function in this repository, it will have been deployed to that URL to receive that request.

You can see how `functions/triggers/onUploadsInsert.js` looks like to understand what's happening.
