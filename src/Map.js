import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import './App.css'
import * as allCoordinates from './data/us_cities.json'
import * as renderCoordinates from './data/final_us_city_coordinates.json'
import * as citiesData from './data/us_cities_with_FID.json'


const Map = () => {

    const d3Container = useRef(null)

    const findCityFID = (path) => {
        const cities = allCoordinates.features

        // Finding FID manually because findIndex uses strict equality
        for (var i = 0; i <= cities.length; i++) {
            const coordinates = cities[i]?.geometry?.coordinates
            const pathCoordinates = path?.geometry?.coordinates
            if (coordinates[0] === pathCoordinates[0] && coordinates[1] === pathCoordinates[1]) {
                return i
            }
        }

        // if coordinates aren't in there
        return console.error("Coordinates not found")
    }

    const findCityUsingFID = (path) => {
        const fid = findCityFID(path)
        const cities = citiesData.default
        return cities.find((city) => city.FID === fid)
    }

    useEffect(() => {
        const svgContainer = d3.select(d3Container.current).append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr("overflow", "visible")
        
        const projection = d3.geoAlbersUsa()

        const geoGenerator = d3.geoPath()
            .projection(projection)
        
        const u = svgContainer.selectAll('path').data(renderCoordinates.default)

        u.enter()
            .append('path')
            .attr('d', geoGenerator)
            .on("mouseover", function(d, path) {
                d3.select(this).style("fill", "red")
                console.log(findCityUsingFID(path)) // need this later for city name mouseover
              })
            .on("mouseout", function(d) {
                d3.select(this).style("fill", "black")
            })

    }, [])
    
    return <div ref={d3Container}></div>
}

export default Map