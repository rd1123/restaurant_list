const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurantModel')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  res.redirect('/')
})

router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

////// 新增一筆餐廳
router.post('/', authenticated, (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })

  restaurant.save(err => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

////// 顯示餐廳詳細資料
router.get('/:id', authenticated, (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.log(err)
      return res.render('show', { restaurant })
    })
})
////// 修改餐廳資料頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      res.render('edit', { restaurant })
    })
})

////// 修改餐廳資料
router.put('/:id', authenticated, (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.log(err)
      res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

////// 刪除餐廳資料
router.delete('/:id', authenticated, (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.remove(err => {
      if (err) return console.log(err)
      res.redirect('/')
    })
  })
})

module.exports = router