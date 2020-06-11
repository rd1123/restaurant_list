////// require
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

////// use express
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
////// use
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


////// set engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

////// set port
const port = 3000

////// set mongoose
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connect!')
})

require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

////// require model
const Restaurant = require('./models/restaurantModel')

////// set route
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/search', require('./routes/search'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

// start server
app.listen(port, () => {
  console.log(`Server is started on http://localhost:${port}`)
})