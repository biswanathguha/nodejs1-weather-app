//const { response } = require("express")

console.log('Client side java script file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
const msg3 = document.querySelector('#msg-3')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            // console.log(data.error)
            msg1.textContent = data.error
        } else {
            
            msg1.textContent = 'Place name : ' + data.place_name 
            
            msg2.textContent = 'Longitude : ' + data.longitude + ' & Latitude : ' + data.latitude
            msg3.textContent = 'Temperature : ' + data.temperature + ' & Feelslike : ' + data.feelslike
            // console.log(data.place_name +
            //     data.longitude +
            //     data.latitude +
            //     data.temperature +
            //     data.feelslike)
        }

    })
})
    
})