const request = require('request')

const weather = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=67385e8063e15878cf337b445ab9c983&query=' + latitude + ',' + longitude
                      
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            //console.log('Logitude : ' + body.features[0].center[0] + ' Latitude : ' + body.features[0].center[1])
          callback('Unable to connect', undefined)
        } else if ( body.current === undefined ){
            // console.log('Unable to connect')
            callback('Unable to locate', undefined)
        } else {
           callback(undefined, {
               temperature: body.current.temperature,
               feelslike: body.current.feelslike
           } )
        }
    })
    
    }
    
    module.exports = {
        weather
    }