import nhost from '@/util/nhost'

export default async (localFileObject) => {
  const { fileMetadata, error } = await nhost.storage.upload({
    file: localFileObject
  })

  if (error) {
    throw error
  }

  console.log('Uploaded file', fileMetadata)

  return fileMetadata
}
