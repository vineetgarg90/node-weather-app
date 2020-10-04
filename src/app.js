const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
geoCode = require('./utils/geocode.js')
forecast = require('./utils/forecast.js')


const publicDir = path.join(__dirname , '../public')
const viewDir = path.join(__dirname , '../templates/views')
const partialsDir = path.join(__dirname , '../templates/partials')


//setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialsDir)


//setup the public dir
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Home',
        name : 'Weather App',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({ error : "Please provide an address to see weather"})
    }

    geoCode(req.query.address, (error, data) => {
        if(error){
            return res.send({ error : error})
        }
        else{
            forecast(data, (error, response) => {
                if(error){
                    return res.send({ error : error})
                }
                else{
                    const obj = {
                        'forecast' : response, 
                        'location' : data.location,
                        'address' : req.query.address,
                    }
                    res.send(obj)
                }
            })
            
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {'page_name' : 'Help Page'})
})

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(3000, () =>{
    console.log("Server started on port 3000")
})