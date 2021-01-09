import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import "./App.css";
import * as citiesData from "./data/us_cities_with_FID.json";
import statesOutline from "./data/states_outline.json";

const Map = ({ onMouseover }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    const svgContainer = d3
      .select(d3Container.current)
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMin meet")
      .attr("viewBox", "0 0 1000 500")
      .style("width", "100%")
      .style("border", "1px solid red")
      .classed("svg-content", true);

    const path = d3.geoPath();

    svgContainer
      .append("path")
      .attr(
        "d",
        path(topojson.mesh(statesOutline, statesOutline.objects.states))
      )
      .style("stroke", "black")
      .style("stroke-width", 0.5)
      .style("fill", "none");

    const u = svgContainer
      .selectAll("circle")
      .data(citiesData.default)
      .enter()
      .append("circle")
      .attr("r", function (d) {
        return d.radius;
      })
      .attr("cx", function (d) {
        return d.cx;
      })
      .attr("cy", function (d) {
        return d.cy;
      })
      .style("stroke", "blue")
      .style("fill", "transparent")
      .on("mouseover", function (d, path) {
        u.style("stroke", "blue")
        d3.select(this).style("stroke", "red");
        onMouseover(path);
      });

    //ADD NYC ANCHORAGE AND HONOLULU BACK
    // const simulation = d3.forceSimulation(citiesData.default)
    //     // .velocityDecay(0.01)
    //     // .force("cx", d3.forceX().x(d => visWidth / 2).strength(0.02))
    //     // .force("cy", d3.forceY().y(d => visHeight / 2).strength(0.02))
    //     .force("x", d3.forceX().x(d => d.cx + d.x).strength(0.3))
    //     .force("y", d3.forceY().y(d => d.cy + d.y).strength(0.3))
    //     // .force("charge", d3.forceManyBody().strength(-1))
    //     // .force("center", d3.forceCenter(visWidth / 2, visHeight/2))
    //     // .force("collide", d3.forceCollide().radius(d => d.radius + 1).strength(1))
    //     // .stop()
    //       .on("tick", ticked);

    // function ticked() {
    //     u.attr("cx", d => d.x)
    //      .attr("cy", d => d.y);
    // }
  }, [onMouseover]);

  return <div className="map" ref={d3Container}></div>;
};

export default Map;
