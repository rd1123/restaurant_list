const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurantModel')
const userForSort = require('../libs/userForSort')


router.get('/', (req, res) => {
  const { sortName, sort } = userForSort(req.query)

  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.log(err)
      return res.render('index', { restaurants, sortName, sort })
    })
})

module.exports = router