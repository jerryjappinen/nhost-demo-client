import trigger from '../../functions-util/trigger'

export default trigger(async (req, res) => {
  // See event payload format:
  // https://hasura.io/docs/latest/graphql/core/event-triggers/payload.html
  console.log('JSON.stringify')
  console.log(JSON.stringify(req.body.event.data.new.id, null, 2))

  return res.send('OK')
})
