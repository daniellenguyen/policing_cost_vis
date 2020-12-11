import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import './App.css'
import * as citiesData from './data/us_cities_with_FID.json'
import statesOutline from './data/states_outline.json'

// should i use typescript?

const BudgetComparison = () => {
    const d3Container = useRef(null)

    useEffect(() => {
        const svgContainer = d3.select(d3Container.current).append("svg")
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("viewBox", "0 0 1000 200")
            .style("width", "100%")
            .attr("x", 1)
            .attr("y", 1)
            .style("border", "1px solid blue")
            .classed("svg-content", true);

        // make city name show at top
        svgContainer.append("text")
        .attr('id', 'state_placeholder')
        .text("Map of the States")
        .attr("font-size", 20)
        .attr("style", "transform: translate(0px, 20px)")
        .enter()

    }, [])
    
    return <div className="budget-comparison" ref={d3Container}></div>
}

export default BudgetComparison