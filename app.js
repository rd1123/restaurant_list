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
app.get('/', (req, res) => {
  res.render('index', { restaurantList })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.find(item => item.id.toString() === req.params.id)
  res.render('show', { restaurant })
})

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