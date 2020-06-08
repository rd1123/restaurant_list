// require
const express = require('express')
// const restaurantList = require('./restaurant.json').results
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

// use express
const app = express()

// use static
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
//////use method-override middleware
app.use(methodOverride('_method'))

// set engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set port
const port = 3000

// set mongoose
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connect!')
})

// require model
const Restaurant = require('./models/restaurantModel')

// set route
////// 首頁
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.log(err)
      return res.render('index', { restaurants })
    })
})

////// 列出全部的餐廳
app.get('/restaurants', (req, res) => {
  res.redirect('/')
})
////// 新增一筆餐廳資料頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

////// 新增一筆餐廳
app.post('/restaurants', (req, res) => {
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
app.get('/restaurants/:id', (req, res) => {
  console.log(req.params.id)
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.log(err)
      return res.render('show', { restaurant })
    })
})
////// 修改餐廳資料頁面
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      res.render('edit', { restaurant })
    })
})

////// 修改餐廳資料
app.put('/restaurants/:id', (req, res) => {
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
app.delete('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.remove(err => {
      if (err) return console.log(err)
      res.redirect('/')
    })
  })
})


////// 搜尋
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.filter(({ name, category }) => {
    return name.toLowerCase().includes(keyword) || category.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurantList: restaurants, keyword })
})

// start server
app.listen(port, () => {
  console.log(`Server is started on http://localhost:${port}`)
})