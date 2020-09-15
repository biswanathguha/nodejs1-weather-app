const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicFileDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Define handlebars view engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicFileDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Biswanath'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Biswanath'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Biswanath'
    })
})

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

app.get('/weather', (req, res) => {

    if( !req.query.address ){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode.geocode(req.query.address, (error, {latitude,longitude, place_name}= {}) => {

        if (error) {
            // return console.log('Error: ' + error)
            return res.send({ error })
        }
        weather.weather(latitude, longitude, (error, {temperature, feelslike,humidity,localtime}={}) => {
            if (error) {
                // return console.log('Error: ' + error)
                return res.send({ error })
            }
            
            res.send( {
                place_name,
                longitude,
                latitude,
                temperature,
                feelslike,
                humidity,
                localtime
            })
            // console.log('Place name: ' + place_name)
            // console.log('Longitude: ' + longitude)
            // console.log('Latitude: ' + latitude)
            // console.log('Temperature: ' + temperature)
            // console.log('Feelslike: ' + feelslike)
        })
    })

    // res.send({
    //     forcast: 50,
    //     location: 'Solihull'
    // })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Biswanath',
        error: 'Help article not found'
    })
})
app.get('*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Biswanath',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})