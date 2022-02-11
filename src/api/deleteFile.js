import nhost from '@/util/nhost'

// Removes an uploaded file
export default async (fileId) => {
  const { error } = await nhost.storage.delete({ fileId })

  if (error) {
    throw error
  }

  // eslint-disable-next-line no-console
  console.log('Deleted file', fileId)

  return true
}
