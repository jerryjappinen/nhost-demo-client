import nhost from '@/util/nhost'

export default async (ownerUserId) => {
  const { data, error } = await nhost.graphql.request(`mutation {
    insert_uploads (
      objects: [
        {
          owner_user_id: "${ownerUserId}"
        }
      ]
    ) {
      returning {
        id
        created_at
        owner_user_id

        files {
          id
        }

        user {
          id
        }

      }
    }
  }`)

  if (error) {
    throw error
  }

  console.log('Inserted upload object', data)

  return data.insert_uploads.returning[0]
}
