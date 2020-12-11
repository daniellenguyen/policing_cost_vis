import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import './App.css'
import * as citiesData from './data/us_cities_with_FID.json'
import statesOutline from './data/states_outline.json'

const PoliceToCivilianRatio = () => {
    const d3Container = useRef(null)

    useEffect(() => {
        const svgContainer = d3.select(d3Container.current).append("svg")
            .attr("preserveAspectRatio", "xMidYMin meet")
            .attr("viewBox", "0 0 1000 500")
            .style("width", "100%")
            .style("border", "1px solid green")
            .classed("svg-content", true);

        // make city name show at top
        svgContainer.append("text")
        .attr('id', 'ratio')
        .text("1 : 30")
        .attr("font-size", 20)
        .attr("style", "transform: translate(0px, 20px)")
        .enter()

    }, [])
    
    return <div className="police-to-civilian-ratio" ref={d3Container}></div>
}

export default PoliceToCivilianRatio