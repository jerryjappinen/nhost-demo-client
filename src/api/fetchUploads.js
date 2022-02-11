import nhost from '@/util/nhost'

// Get all uploads that the API returns
// We don't worry about filtering, since permissions won't allow us to get any data that we don't want
// We could also do this: uploads(where: {owner_user_id: {_eq: "${currentUserId}"}}) {
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

  // eslint-disable-next-line no-console
  console.log('Fetched upload objects', data.uploads)

  return data.uploads
}
