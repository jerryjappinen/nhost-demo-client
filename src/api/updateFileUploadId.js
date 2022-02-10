import nhost from '@/util/nhost'

export default async (fileId, uploadId) => {
  const { data, error } = await nhost.graphql.request(`mutation {
    updateFiles (
      _set: {
        upload_id: {
          _eq: "${uploadId}"
        }
      }, where: {
        id: {
          _eq: "${fileId}"
        }
      }
    ) {
      returning {
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
    }
  }`)

  if (error) {
    throw error
  }

  console.log('Updated file object', data)

  return data.updateFiles.returning[0]
}
