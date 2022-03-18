export default (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))

  return res.send('OK')
}
