//const { response } = require("express")

console.log('Client side java script file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
const msg3 = document.querySelector('#msg-3')
const msg4 = document.querySelector('#msg-4')
const msg5 = document.querySelector('#msg-5')
const msg6 = document.querySelector('#msg-6')
const msg7 = document.querySelector('#msg-7')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''
    msg5.textContent = ''
    msg6.textContent = ''
    msg7.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            // console.log(data.error)
            msg1.textContent = data.error
        } else {
            
            msg1.textContent = 'Place name : ' + data.place_name 
            
            msg2.textContent = 'Longitude : ' + data.longitude + ' & Latitude : ' + data.latitude
            msg3.textContent = 'Temperature : ' + data.temperature + ' , Feelslike : ' + data.feelslike +
                               ', Humidity : ' + data.humidity + '%'
                               
            msg4.textContent = 'Local time : ' + data.localtime
            msg5.textContent = 'Wind Speed : ' + data.wind_speed + ' km/hr'
            msg6.textContent = 'Wind Degree : ' + data.wind_degree + ' degree'
            msg7.textContent = 'Wind Direction : ' + data.wind_dir
            // console.log(data.place_name +
            //     data.longitude +
            //     data.latitude +
            //     data.temperature +
            //     data.feelslike)
        }

    })
})
    
})