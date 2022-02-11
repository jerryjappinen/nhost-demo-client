import nhost from '@/util/nhost'

// Uploads file to Nhost
export default async (localFileObject) => {
  const { fileMetadata, error } = await nhost.storage.upload({
    file: localFileObject
  })

  if (error) {
    throw error
  }

  // eslint-disable-next-line no-console
  console.log('Uploaded file', fileMetadata)

  return fileMetadata
}
