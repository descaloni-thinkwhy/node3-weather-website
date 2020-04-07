const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Defines Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Daniel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Daniel E'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is for testing',
        title: 'Help',
        name: 'Daniel E'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address Must be provided.'
        })
    }
    geocode(req.query.address, (error, {latitude, longetude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longetude, latitude, (error, data) => {
            if (error) {
                return res.send({error})
            }
            res.send ({
                    search: req.query.address,
                    location,
                    weather: data

            })

        })
    })

})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article Not Found',
        name: 'Daniel E',
        errorText: 'This is for testing help 404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        errorText: 'This is for testing all 404'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
