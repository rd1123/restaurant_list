// require
const express = require('express')
const restaurantList = require('./restaurant.json').results
const exphbs = require('express-handlebars')

// use express
const app = express()

// use static
app.use(express.static('public'))

// set engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set port
const port = 3000

// set route
////// 首頁
app.get('/', (req, res) => {
  res.render('index', { restaurantList })
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
  res.render('/')
})

////// 顯示餐廳詳細資料
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.find(item => item.id.toString() === req.params.id)
  res.render('show', { restaurant })
})
////// 修改餐廳資料頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.render('edit')
})

////// 修改餐廳資料
app.post('/restaurants/:id/edit', (req, res) => {
  res.render('/')
})

////// 刪除餐廳資料
app.post('/restaurants/:id/delete', (req, res) => {
  res.render('/')
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