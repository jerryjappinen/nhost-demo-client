export default async (req, res) => {
  // See event payload format:
  // https://hasura.io/docs/latest/graphql/core/event-triggers/payload.html
  console.log('JSON.stringify')
  console.log(JSON.stringify(req.body, null, 2))

  return res.send('OK')
}
