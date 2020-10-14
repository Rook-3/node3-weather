const request = require("request");

const forecast = (long,lat,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=98386792c4d1684c7ac6ba1af3e6293b&query=${long},${lat}&units=f`

    request({url,json:true}, (error,{body} = response)=>{
        if(error){
            callback("Network Error. Unable to establish weather connection",undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`)

        }
    })
}


module.exports = forecast;