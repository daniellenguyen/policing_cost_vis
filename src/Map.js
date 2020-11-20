import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import './App.css'
import * as citiesData from './data/us_cities_with_FID.json'
import statesOutline from './data/states_outline.json'

const Map = () => {

    const d3Container = useRef(null)
    const visWidth = 1100;
    const visHeight = 900;

    useEffect(() => {
        const svgContainer = d3.select(d3Container.current).append("svg")
            .attr("width", visWidth)
            .attr("height", visHeight)

        // make city name show at top
        svgContainer.append("text")
        .attr('id', 'state_placeholder')
        .text("Map of the States")
        .attr("font-size", 20)
        .attr("style", "transform: translate(0px, 20px)")
        .enter()

        // const projection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305])
        const path = d3.geoPath() // should be geoAlbers for consistency. update data file to reflect this

        svgContainer.append("path")
        .attr("d", path(topojson.mesh(statesOutline, statesOutline.objects.states)))
        .style("stroke", "black")
        .style("stroke-width", 0.5)
        .style("fill", "none")
        
        const u = svgContainer.selectAll('circle')
            .data(citiesData.default)
            .enter()
            .append('circle')
            .attr("r", function(d) { return d.radius })
            .attr("cx", function(d) { return d.cx }) // where are Anchorage and Honolulu?
            .attr("cy", function(d) { return d.cy })
            .style("stroke", "blue")
            .style("fill", "white")
            .on("mouseover", function(d, path) {
                d3.select(this)
                .style("stroke", "red")
                .style("fill", "white")

                d3.select('#state_placeholder').text(path.City + " " + path.cx + " " + path.cy)
                console.log(path)
              })
            .on("mouseout", function(d) {
                d3.select(this).style("stroke", "blue").style("fill", "none")
            })

        //     const simulation = d3.forceSimulation(citiesData.default)
        //       .velocityDecay(0.2)
        //       .force("charge", d3.forceManyBody().strength(5))
        //       .force("center", d3.forceCenter(visWidth / 2, visHeight / 2))
        //       .force("collide", d3.forceCollide().radius(d => d.radius).iterations(1))
        //       .force("x", d3.forceX().x(function(d) { return d.cx }))
        //       .force("y", d3.forceY().y(function(d) {return 0 }))
        //       .on("tick", ticked);

        // function ticked() {
        //     u.attr("cx", d => d.x)
        //      .attr("cy", d => d.y);
        // }

        // simulation.on("tick", ticked)

    }, [])
    
    return <div className="map" ref={d3Container}></div>
}

export default Map