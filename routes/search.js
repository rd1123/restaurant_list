const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurantModel')


router.get('/', (req, res) => {
  const keyword = req.query.keyword

  Restaurant.find()
    .lean()
    .exec((err, restaurantList) => {
      if (err) return console.log(err)
      const restaurants = restaurantList.filter(({ name, category }) => {
        return name.toLowerCase().includes(keyword) || category.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants, keyword })
    })
})

module.exports = router