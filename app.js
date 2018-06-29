const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const Post = require('./models/post')

const app = express()

// set for ejs
app.set('view engine', 'ejs')
// use body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// use for static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    '/javascript',
    express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
)



// const arr = ['hi', 'privet', 'bonjure']

app.get('/', (req, res) => {
    console.log(`__dirname = ${__dirname }`)

    Post.find({})
        .then(posts => {
            console.log(posts);
            res.render('index', {
                posts: posts
            })
        })
})

app.get('/create', (req, res) => res.render('create'))
app.post('/create', (req, res) => {
    const {title, body} = req.body;
    
    Post.create({
        title: title,
        body: body
    })
    .then(post => {
        console.log(post)
    });

    res.redirect('/')
})

module.exports = app
