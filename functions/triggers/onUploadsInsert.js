import nhost from '../../src/util/nhost'

import trigger from '../../functions-util/trigger'

export default trigger(async (req, res) => {
  const upload = req.body.event.data.new

  // See event payload format:
  // https://hasura.io/docs/latest/graphql/core/event-triggers/payload.html
  // eslint-disable-next-line no-console
  console.log('onUploadsInsert', upload)

  // Write logs into logs table
  // In a real app, you could use this approach for business analytics
  // You could also send data into an external platform like Amplitude
  // NOTE: This function is invoked after insert. It won't delay the actual insert operation
  const { data, error } = await nhost.graphql.request(`mutation ($message: String!, $data: JSON, $userId: ID) {
    insert_logs (
      objects: [
        {
          message: $message
          user_id: $userId
          data: $data
        }
      ]
    ) {
      returning { id }
    }
  }`, {
    message: 'Upload created',
    userId: upload.owner_user_id,
    data: upload
  }, {

    // Because we use the admin secret, we can insert data into `logs` even though there are no permissions
    headers: {
      'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET
    }
  })

  console.warn('Error in pn UploadsInsert trigger', error)

  if (error) {
    throw new Error(error.message)
  }

  return res.json({
    message: 'New upload logged',
    data: data.returning
  })
})
