const express = require('express')
const User = require('../models/user')
const router = express.Router()
const passport = require('passport')


router.get('/login', (req, res) => {
  res.render('login', { layout: 'user' })
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register', { layout: 'user' })
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        console.log('User already exists')
        res.render('register', { name, email, password, password2 }, { layout: 'user' })
      } else {
        const newUser = new User({
          name,
          email,
          password
        })
        newUser
          .save()
          .then(user => {
            res.redirect('/')
          })
          .catch(err => console.log(err))
      }
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router