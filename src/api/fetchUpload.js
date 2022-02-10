import nhost from '@/util/nhost'

export default async (uploadId) => {
  const { data, error } = await nhost.graphql.request(`query {
    uploads (
      where: {
        id: {
          _eq: "${uploadId}"
        }
      }
    ) {
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

  console.log('Fetched upload object', data)

  return data.uploads[0]
}
