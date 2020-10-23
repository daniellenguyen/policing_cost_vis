// Get the coordinate objects in us_cities.json matching the cities in us_cities_with_FID.
// Write these coordinate objects to a new json file.

const fs = require('fs')
const us_cities = require('./us_cities.json')
const us_cities_with_FID = require('./us_cities_with_FID.json')

const final_us_city_coordinates = []
us_cities_with_FID.map((city) => {
    const allCoordinates = us_cities.features
    final_us_city_coordinates.push(allCoordinates[city.FID])
})

const stringified_coordinates = JSON.stringify(final_us_city_coordinates)
fs.writeFile('final_us_city_coordinates.json', stringified_coordinates, 'utf8', (error) => {
    console.error(error);
})