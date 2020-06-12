const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurantModel')
const userForSort = require('../libs/userForSort')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const keyword = req.query.keyword
  const sortObject = userForSort(req.query)

  Restaurant.find({ userId: req.user._id })
    .sort(sortObject)
    .lean()
    .exec((err, restaurantList) => {
      if (err) return console.log(err)
      const restaurants = restaurantList.filter(({ name, category }) => {
        return name.toLowerCase().includes(keyword) || category.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants, keyword, sortName: Object.keys(sortObject), sort: Object.values(sortObject) })
    })
})

module.exports = router