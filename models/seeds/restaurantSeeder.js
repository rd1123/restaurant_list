const mongoose = require('mongoose')
const Restaurant = require('../restaurantModel')
const restaurantList = require('../../restaurant.json').results

// db connect
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connect!')

  for (let item in restaurantList) {
    Restaurant.create(restaurantList[item])
  }

  console.log('done')
})