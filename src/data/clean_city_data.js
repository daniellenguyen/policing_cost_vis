// Get the coordinate objects in us_cities.json matching the cities in us_cities_with_FID.
// Write these coordinate objects to a new json file.

const fs = require('fs')
const us_cities_with_FID = require('./us_cities_with_FID.json')

const writeJsonToFile = (json, filename) => {
    const stringified_coordinates = JSON.stringify(json)
    fs.writeFile(filename, stringified_coordinates, 'utf8', (error) => {
        console.error(error);
    })
}


const cleaned_city_info = []
const clean = (val) => {
    const cleanedBudget = val.replace(/\$|\,|\%/g, "")
    return parseInt(cleanedBudget)
}

us_cities_with_FID.map((city) => {
    const newCity = {
        ...city,
        "Overall_Policing_Budget": clean(city.Overall_Policing_Budget),
        "percent_city_funds_spent_on_policing": clean(city.percent_city_funds_spent_on_policing),
        "city_money_per_resident_for_police": clean(city.city_money_per_resident_for_police),

    }
    cleaned_city_info.push(newCity)
    return null
})

writeJsonToFile(cleaned_city_info, "us_cities_with_FID.json")