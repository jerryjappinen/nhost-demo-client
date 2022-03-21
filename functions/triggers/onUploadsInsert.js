import trigger from '../../functions-util/trigger'

export default trigger(async (req, res) => {
  // See event payload format:
  // https://hasura.io/docs/latest/graphql/core/event-triggers/payload.html
  // eslint-disable-next-line no-console
  console.log('onUploadsInsert', JSON.stringify(req.body.event.data.new, null, 2))

  return res.json({
    message: 'Upload inserted',
    upload: req.body.event.data.new
  })
})
