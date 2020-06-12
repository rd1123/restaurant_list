const mongoose = require('mongoose')
const Restaurant = require('../restaurantModel')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results
const userList = [{ email: 'user1@example.com', password: '12345678' }, { email: 'user2@example.com', password: '12345678' }]
const bcrypt = require('bcryptjs')



mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('db connect error')
})

db.once('open', () => {
  console.log('db connect!')
  let index = 0
  for (let i = 0; i < userList.length; i++) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(userList[i].password, salt, (err, hash) => {
        userList[i].password = hash

        User.create(userList[i]).then(user => {
          let count = 0
          for (let x = index; x < restaurantList.length; x++) {
            restaurantList[x].userId = user._id
            Restaurant.create(restaurantList[x])

            count++
            index = x + 1
            if (count === 3) break
          }
        })
      })
    })
  }
  console.log('done')
})