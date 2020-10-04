const request = require('request')
const weatherStackKey = '<WEATHER STACK KEY HERE>'

const foreCast = (({lat, lng}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + weatherStackKey + '&query=' + lat + "," + lng
    request({url : url, json : true},(error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else{
            if(!body.error){
                const weather = body.current.weather_descriptions[0] + ". It's currently "+ body.current.temperature + " degrees outside. There is a " + body.current.precip + "% chance of rain."
                callback(null, weather)
            }
            else{
                callback(body.error.info, undefined)
            }
        }
    })
})

module.exports = foreCast