
const d3 = require('d3')
const fs = require('fs')
const us_cities_with_FID = require('./us_cities_with_FID.json')
// const chosen_us_cities_coordinates = require('./final_us_city_coordinates.json')
// const all_us_cities_coordinates = require('./us_cities.json')
const cities_coordinates = require('./cities_coordinates.json')

const writeJsonToFile = (json, filename) => {
    const stringified_coordinates = JSON.stringify(json)
    fs.writeFile(filename, stringified_coordinates, 'utf8', (error) => {
        console.error(error);
    })
}

// Convert strings to numerical values. Was necessary for:
// - Overall Policing Budget
// - % city funds spent on policing
// - City money per resident for police
const clean = (value) => {
    const cleanedBudget = value.replace(/\$|\,|\%/g, "")
    return parseInt(cleanedBudget)
}

const budgetToRadius = d3.scaleLinear()
    .domain([14493787, 11036298140]) // lowest to highest policing budget. 14 million to 1 billion
    .range([5, 100]) //log scale alternative button. explain scaling decision in a small blurb. scaling decision gets across that ny spends 10 times more than any other city

// const coordinatesToFID = []
// const allCities = all_us_cities_coordinates.features
// chosen_us_cities_coordinates.map((point) => {
//     // Finding FID manually because findIndex uses strict equality
//     for (var i = 0; i < allCities.length; i++) {
//         const coordinates = allCities[i].geometry?.coordinates
//         const pathCoordinates = point.geometry?.coordinates
//         if (coordinates[0] === pathCoordinates[0] 
//             && coordinates[1] === pathCoordinates[1]) {
//             coordinatesToFID.push({
//                 "FID": i,
//                 "coordinates": pathCoordinates
//             })
//         }
//     }
// })

// TODO write test on whether FID coordinates matches city name
// TODO tests on proper type for policing budget etc
// TODO data tests in general
// TODO how many circles are on the screen
const cleaned_city_info = []
const projection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305])

us_cities_with_FID.map((city) => {
    const radius = budgetToRadius(city.Overall_Policing_Budget) // needed clean function
    const coordinates = cities_coordinates.find((d) => { return d.city === city.City && d.state === city.State })
    const projectedCoordinates = projection([coordinates?.longitude, coordinates?.latitude])
    const newCity = {
        ...city, // includes police dept. employee to resident ratio
        "radius": radius,
        "cx": projectedCoordinates[0],
        "cy": projectedCoordinates[1],
        "latitude": coordinates?.latitude,
        "longitude": coordinates?.longitude,
        "Overall_Policing_Budget": city.Overall_Policing_Budget, // needed clean function
        "percent_city_funds_spent_on_policing": city.percent_city_funds_spent_on_policing, // needed clean function
        "city_money_per_resident_for_police": city.city_money_per_resident_for_police, // needed clean function
    }
    cleaned_city_info.push(newCity)
    return null
})

console.log(cleaned_city_info)

writeJsonToFile(cleaned_city_info, "us_cities_with_FID.json")