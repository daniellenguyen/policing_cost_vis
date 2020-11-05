import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import './App.css'
import * as citiesData from './data/us_cities_with_FID.json'

const Map = () => {

    const d3Container = useRef(null)

    useEffect(() => {
        const svgContainer = d3.select(d3Container.current).append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr("overflow", "visible")

        const u = svgContainer.selectAll('circle')
            .data(citiesData.default)
            .enter()
            .append('circle')
            .attr("r", function(d) { return d.radius })
            .attr("cx", function(d) { return d.cx })
            .attr("cy", function(d) { return d.cy })
            .style("stroke", "blue")
            .style("fill", "white")
            .on("mouseover", function(d, path) {
                d3.select(this)
                .style("stroke", "red")
                .style("fill", "white")
                // console.log(path.City) // for city name mouseover
              })
            .on("mouseout", function(d) {
                d3.select(this).style("stroke", "blue").style("fill", "none")
            })

            const simulation = d3.forceSimulation(citiesData.default)
              .velocityDecay(0.2)
              .force("x", d3.forceX().strength(0.002))
              .force("y", d3.forceY().strength(0.002))
              .force("collide", d3.forceCollide().radius(d => d.r + 0.5).iterations(2))
              .on("tick", ticked);

        function ticked() {
            u
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        }
            
        simulation.on("tick", ticked)

    }, [])
    
    return <div ref={d3Container}></div>
}

export default Map