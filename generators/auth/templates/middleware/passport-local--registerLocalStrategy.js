const User = require('../models/User.js')
const LocalStrategy = require('passport-local').Strategy

const userPasswordFields = {
    usernameField: 'email',
    passwordField: 'password'
}

async function  localStrategyHandler(inputEmail, inputPassword, doneCb) {

  try {
    const user = await User
      .query()
      .where({email: inputEmail})
      .first()
      .returning('*')

    if(!user){ return doneCb(null, false, `not a valid user pass`) }

    const isValidPassword = await user.verifyPassword(inputPassword)

    console.log('user??', user)
    if(!isValidPassword){ return doneCb(null, false, `incorrect user password`) }

    console.log('user??', user)
    delete user.password
    return doneCb(null, user)

  } catch (err) {
    doneCb(err)
  }
}

module.exports = function(){
  return new LocalStrategy(userPasswordFields , localStrategyHandler)
}
