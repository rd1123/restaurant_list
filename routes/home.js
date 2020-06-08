const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurantModel')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.log(err)
      return res.render('index', { restaurants })
    })
})

module.exports = router