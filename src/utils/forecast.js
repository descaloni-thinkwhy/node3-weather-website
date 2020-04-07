const request = require('request')

const forecast = (longetude, latitude ,callback) => {
    const url = ('https://api.darksky.net/forecast/9e4208d409da449ec3779ffc013e2726/' + latitude + ',' + longetude)
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to services', undefined)
        } else if (body.error) {
            var failure_msg = body.query
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                longetude: longetude,
                latitude: latitude,
                temp: body.currently.temperature,
                humid: body.currently.precipProbability,
                msg: body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'

            })
        }
    })
}

module.exports = forecast
