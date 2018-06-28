const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

const arr = ['hi', 'privet', 'bonjure']

app.get('/', (req, res) => res.render('index', {arr: arr}))

app.get('/create', (req, res) => res.render('create'))
app.post('/create', (req, res) => {
    // console.log(req.body)
    arr.push(req.body.text)
    res.redirect('/')
})

module.exports = app