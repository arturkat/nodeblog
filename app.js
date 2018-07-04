const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const staticAsset = require('static-asset')
const mongoose = require('mongoose')
const config = require('./config')

/* DATABASE */
mongoose.Promise = global.Promise
mongoose.set('debug', config.IS_PRODUCTION)
mongoose.connection
    .on('error', error => console.log(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
        const info = mongoose.connections[0]
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`)
    })
mongoose.connect(
    `mongodb://${config.database.login}:${
        config.database.password
    }@ds121371.mlab.com:21371/blog`
)
// Mongoose MODELS
const Post = require('./models/post')
/* DATABASE _end */

/* EXPRESS */
const app = express()

/* SETS AND USES */
// set for ejs
app.set('view engine', 'ejs')
// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// use for my static assets
app.use(staticAsset(path.join(__dirname, 'public')))
// use for static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(
    '/javascripts',
    express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
)

// const arr = ['hi', 'privet', 'bonjure']

/* ROUTERS */
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/hi', (req, res) => {
    res.render('hi')
})

app.get('/posts', (req, res) => {
    console.log(`__dirname = ${__dirname}`)

    Post.find({}).then(posts => {
        console.log(posts)
        res.render('index', {
            posts: posts
        })
    })
})

app.get('/create', (req, res) => res.render('create'))
app.post('/create', (req, res) => {
    const { title, body } = req.body

    Post.create({
        title: title,
        body: body
    }).then(post => {
        console.log(post)
    })

    res.redirect('/')
})
/* ROUTERS _END*/

/* ERROR HANDLERS */
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.render('error', {
        message: error.message,
        error: !config.IS_PRODUCTION ? error : {}
    })
})
/* ERROR HANDLERS _END*/

/* LISTEN */
app.listen(config.PORT, () => {
    console.log(`**LISTEN**`)
    console.log(`Config port: ${config.PORT}!`)
    console.log(`Config IS_PRODUCTION: ${config.IS_PRODUCTION}`)
    console.log(`**LISTEN _END**`)
})
/* LISTEN _END*/
