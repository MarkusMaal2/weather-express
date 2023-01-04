const express = require('express')
const app = express()

const path = require('path')

const viewsDir = 'views'

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, viewsDir))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3011)