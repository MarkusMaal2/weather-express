
//const key = "f888f2d4b332b94625bd937ba929ae14"
const key = "fakekey"
let default_city = "Tartu"

const getWeatherDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                let description = data.weather[0].description
                let city = data.name
                let temp = Math.round((data.main.temp)-273.35)
                let result = {
                    description: description,
                    city : city,
                    temp: temp,
                    error: null
                }
                resolve (result)
            })
            .catch (error => {
                reject(error)
            })
    })
}

const express = require('express')
const app = express()

const path = require('path')
const {response} = require("express");

const viewsDir = 'views'

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, viewsDir))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.all('/', (req, res) => {
    let city = default_city
    if (req.method === "POST") {
        city = req.body["cityname"]
    }
    getWeatherDataPromise(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then (data => {
            res.render('index', data)
        })
        .catch(error => {
            res.render('index', {error: 'Problem getting data, please try again later'})
        })
})

app.listen(3011)
