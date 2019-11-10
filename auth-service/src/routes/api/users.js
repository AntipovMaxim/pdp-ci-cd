const mongoose = require('mongoose')
const router = require('express').Router()
const verifyToken = require('../../middlewares/verify-token.middleware')
const Users = mongoose.model('Users')

//POST new user route (optional, everyone has access)
router.post('/', (req, res, next) => {
  const { body: { user } } = req

  if (!user.email || !user.password) {
    return res.status(412).json({ title: 'Validation Error', error: 'Email and password is required' })
  }

  const finalUser = new Users(user)
  finalUser.setPassword(user.password)
  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
})

//POST login route (optional, everyone has access)
router.post('/login', (req, res, next) => {
  const { body: { user: { email, password } } } = req

  if (!email || !password) {
    return res.status(412).json({ title: 'Validation Error', error: 'Email and password is required' })
  }

  Users.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server.')
    if (!user) return res.status(404).send('No user found.')

    const isValidPassword = user.validatePassword(password)
    if (!isValidPassword) return res.status(401).send({ auth: false, token: null });

    return res.json({ user: user.toAuthJSON() })
  })
})

router.get('/current', verifyToken, (req, res, next) => {
  Users.findById(req.userId, (err, user) => {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });

});

module.exports = router
