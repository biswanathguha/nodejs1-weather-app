
const request = require('request')

const geocode = (location, callback) => {
const geoCoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) +
                  '.json?access_token=pk.eyJ1IjoiYmlzd2FuYXRoMTciLCJhIjoiY2tld2R5eGZvMDBhYTJ0cnp1dDRrOTFtZyJ9.9Jvqd4HjtiF8B2IbQlNXTg&limit=1'

request({ url: geoCoding, json: true }, (error, {body}) => {
    if (error) {
        //console.log('Logitude : ' + body.features[0].center[0] + ' Latitude : ' + body.features[0].center[1])
      callback('Unable to connect', undefined)
    } else if ( body.features.length === 0 ){
        // console.log('Unable to connect')
        callback('Unable to locate', undefined)
    } else {
       callback(undefined, {
           longitude: body.features[0].center[0],
           latitude: body.features[0].center[1],
           place_name: body.features[0].place_name
       } )
    }
})

}

module.exports = {
    geocode
}