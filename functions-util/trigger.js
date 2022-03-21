// Helper function that ensures a webhook is triggered by the Nhost backend
// Read more: https://docs.nhost.io/platform/serverless-functions/event-triggers
export default (handler) => {
  return async (req, res) => {
    // Check webhook secret to make sure the request is valid
    if (req.headers['nhost-webhook-secret'] !== process.env.NHOST_WEBHOOK_SECRET) {
      return res.status(400).send('Incorrect webhook secret')
    }

    // Your handler can do whatever you like:
    // - Send an email
    // - Create a subscription in Stripe
    // - Generate logs or analytics
    // - Generate a PDF
    // - Send a message to Slack or Discord
    // - Update some data in the database
    await handler(req, res)
  }
}
