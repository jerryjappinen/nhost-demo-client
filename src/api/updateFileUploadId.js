import nhost from '@/util/nhost'

// Updates the `upload_id` field of a file on Nhost
// This will create a relation between `upload` and `file`
// NOTE: since files are system objects, camelCase is used
export default async (fileId, uploadId) => {
  const { data, error } = await nhost.graphql.request(`mutation {
    updateFiles (
      _set: {
        upload_id: "${uploadId}"
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

  // eslint-disable-next-line no-console
  console.log('Updated file object', data)

  return data.updateFiles.returning[0]
}
