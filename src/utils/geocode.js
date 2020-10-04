const request = require('request')
const mapBoxKey = '<MAPBOX KEY HERE>'

//Geocoding
const geoCode = ((address, callback) => {
    latLngUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapBoxKey + '&limit=1'

    request({url : latLngUrl, json: true},(error, { body })=>{
        if(error){
            callback(error, undefined)
            console.log(error)
        }
        else{
            if(!body.features || !body.features.length){
                callback('Unable to find location', undefined)
            }
            else{
                // console.log(body)
                const op = {
                    lat: body.features[0].center[1],
                    lng: body.features[0].center[0],
                    location: body.features[0].place_name
                }
                callback(null, op)
            }
        }
    })
})

module.exports = geoCode