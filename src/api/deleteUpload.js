import nhost from '@/util/nhost'

// Creates a new `upload` object
export default async (uploadId) => {
  const { data, error } = await nhost.graphql.request(`mutation {
    delete_uploads (
      where: {
        id: {
          _eq: "${uploadId}"
        }
      }
    ) {
      affected_rows
    }
  }`)

  if (error) {
    throw error
  }

  // eslint-disable-next-line no-console
  console.log('Deleted upload object', data.delete_uploads.affected_rows)

  return data.delete_uploads.affected_rows
}
