const fs = require('fs')
const cities_coordinates = require('./cities_coordinates.json')
const temp_label_coordinates = require('./temp_label_coordinates.json')

const writeJsonToFile = (json, filename) => {
    const stringified_coordinates = JSON.stringify(json)
    fs.writeFile(filename, stringified_coordinates, 'utf8', (error) => {
        console.error(error);
    })
}

Object.keys(temp_label_coordinates).map((key, index) => {
    const newLatLong = temp_label_coordinates[key]
    let city = cities_coordinates.find(obj => obj.city === key)
    city.label_latitude = newLatLong[0]
    city.label_longitude = newLatLong[1]
    return null
})

writeJsonToFile(cities_coordinates, "cities_coordinates_test.json")
