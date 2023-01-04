
class Weather {
    constructor(city) {
        this.city = city
        this.key = "f888f2d4b332b94625bd937ba929ae14"
    }

    async getWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.key}`)
        const responseData = await response.json()
        return responseData
    }

    changeCity(city) {
        this.city = city
    }
}

const express = require('express')
const app = express()

const path = require('path')

const viewsDir = 'views'

const initialCity = "Tartu"

const weather = new Weather(initialCity)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, viewsDir))

app.get('/', (req, res) => {
    weather.getWeather()
        .then(data => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.35)
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
        .catch(error => console.log(error))
})

app.listen(3011)
