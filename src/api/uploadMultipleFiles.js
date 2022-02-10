import uploadFile from './uploadFile'

export default async (localFileObjects) => {
  console.log('uploadMultipleFiles', localFileObjects)

  return localFileObjects && localFileObjects.length
    ? Promise.all(localFileObjects.map(uploadFile))
    : []
}
