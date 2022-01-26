# nhost-demo-client

This is a demo app with an [Nhost](https://nhost.io/) backend.

## Local setup

Recommended node version is 14 LTS or 16 LTS.

```sh
# Install dependencies
npm install
```

You can override environment variables locally by adding an `.env.local` file to the project.

### Commands

```sh
# Start project locally
npm run serve

# Build static app
npm run build

# Lint and test
npm run lint
npm run test
npm run test:watch
```

### Project configuration

`vue.config.js` defines some parts of the build process that impact the app. See [Vue CLI configuration reference](https://cli.vuejs.org/config/) for more details.
