const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users.map(user => user.toJSON()))
  } catch (exception) {
    next(exception)
  }
})


usersRouter.post('/', async (request, response, next) => {

  try {
    const body = request.body

    const already_user = await User.find({ username: body.username })

    if (already_user.length !== 0) {
      return response.status(400).json({ error: 'This user is not unique' })
    }

    if (!body.password) {
      return response.status(400).json({ error: "Password is missing" })
    } else if (body.password.length < 3) {
      return response.status(400).json({ error: "Password must be at least 3 characters long" })
    }

    if (!body.username) {
      return response.status(400).json({ error: "Username is missing" })
    } else if (body.username.length < 3) {
      return response.status(400).json({ error: "Username must be at least 3 characters long" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }

})

module.exports = usersRouter