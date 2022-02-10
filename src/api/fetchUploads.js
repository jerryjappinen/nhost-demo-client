import nhost from '@/util/nhost'

// Here we get all uplodas that the API returns
// We don't worry about filtering, since permissions won't allow us to query any data that we don't want
// We could also query this: uploads(where: {owner_user_id: {_eq: "${currentUserId}"}}) {
export default async () => {
  const { data, error } = await nhost.graphql.request(`{
    uploads {
      id
      created_at
      owner_user_id

      files {
        id
        createdAt

        name
        size
        mimeType

        upload_id
        upload {
          id
        }
      }

      user {
        id
      }

    }
  }`)

  if (error) {
    throw error
  }

  console.log('Fetched upload objects', data.uploads)

  return data.uploads
}
