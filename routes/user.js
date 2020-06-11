const express = require('express')
const User = require('../models/user')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login', { layout: 'user' })
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureMessage: req.flash('warning_msg', '未輸入帳號密碼')
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register', { layout: 'user' })
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  const errors = []
  if (!email || !password || !password2) {
    errors.push({ message: '以下皆為必填欄位' })
  }
  if (password !== password2) {
    errors.push({ message: '確認密碼不同' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
      layout: 'user'
    })
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ message: '帳號已註冊' })
          res.render('register', { name, email, errors, layout: 'user' })
        } else {
          const newUser = new User({
            name,
            email,
            password
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash
              newUser.save().then(user => {
                res.redirect('/users/login')
              })
                .catch(err => console.log(err))
            })
          })
        }
      })
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '成功登出')
  res.redirect('/users/login')
})

module.exports = router