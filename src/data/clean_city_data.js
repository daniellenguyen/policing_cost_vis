
const d3 = require('d3')
const fs = require('fs')
const us_cities_with_FID = require('./us_cities_with_FID.json')
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

const cleaned_city_info = []
const projection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305])

us_cities_with_FID.map((city) => {
    const radius = budgetToRadius(city.overall_policing_budget) // needed clean function, UNNECESSARY NOW because radius should be a constant
    const coordinates = cities_coordinates.find((d) => { return d.city === city.City && d.state === city.State })
    const projectedCoordinates = projection([coordinates?.longitude, coordinates?.latitude])
    const projectedLabelCoordinates = projection([coordinates?.label_longitude, coordinates?.label_latitude])

    const newCity = {
        ...city, // includes police dept. employee to resident ratio
        "radius": radius, // irrelevant now bc radius is constant
        "cx": projectedCoordinates[0],
        "cy": projectedCoordinates[1],
        "labelx": projectedLabelCoordinates[0],
        "labely": projectedLabelCoordinates[1],
        "latitude": coordinates?.latitude,
        "longitude": coordinates?.longitude,
        "overall_policing_budget": city.overall_policing_budget, // needed clean function
        "percent_city_funds_spent_on_policing": city.percent_city_funds_spent_on_policing, // needed clean function
        "policing_budget_per_capita": city.policing_budget_per_capita, // needed clean function
    }

    cleaned_city_info.push(newCity)
    return null
})

writeJsonToFile(cleaned_city_info, "us_cities_with_FID.json")
