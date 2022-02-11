import uploadFile from './uploadFile'

// Use Promise.all() to upload multiple files in parallel
export default async (localFileObjects) => {
  return localFileObjects && localFileObjects.length
    ? Promise.all(localFileObjects.map(uploadFile))
    : []
}
