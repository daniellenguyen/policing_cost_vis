import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import "./App.css";
import citiesData from "./data/us_cities_with_FID.json";
import statesOutline from "./data/states_outline.json";

// Had to slightly change long/lat manually for some cities so they wouldn't overlap.
// Here are the original long/lat for those cities:
// - Fort Worth longitude: -97.4294026
// - Dallas longitude: -96.8716261
// - Newark latitude: 40.7313432
// - New York latitutde 40.6976637
// - New York longitude -74.1197639

const Map = ({ onMouseover }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    const svgContainer = d3
      .select(d3Container.current)
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("viewBox", "-62 70 1100 500")
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
      .data(citiesData)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", (d) => d.cx)
      .attr("cy", (d) => d.cy)
      .style("stroke", "#7df9ff") // electric blue
      .style("fill", "#7df9ff")
      .on("click", function (d, i) {
        u.style("stroke", "#7df9ff").style("fill", "#7df9ff");
        d3.select(this)
          .style("fill", "#ff837d") // complimentary to electric blue. see if colorblind safe
          .style("stroke", "#ff837d");
        onMouseover(i);
      });

    // let tempLabelCoordinates = {};
    // const projection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);
    // const drag = d3.drag().on("drag", function (event, d) {
    //   const draggedLatLong = projection.invert([event.x, event.y]);
    //   d3.select(this)
    //     .attr("x", (d.x = event.x))
    //     .attr("y", (d.y = event.y));
    //   tempLabelCoordinates[d.City] = [draggedLatLong[1], draggedLatLong[0]];
    //   console.log(JSON.stringify(tempLabelCoordinates))
    // });

    const cityNames = svgContainer
      .selectAll("text")
      .data(citiesData)
      .enter()
      .append("text")
      .attr("x", (d) => d.labelx + 3)
      .attr("y", (d) => d.labely - 3)
      .text((d) => d.City)
      .style("font", "14px arial")
      .on("click", function (d, i) {
        cityNames.style("font", "12px arial").style("fill", "black")

        d3.select(this)
        .style("font", "italic 40px serif")
        .style("fill", "red")
        onMouseover(i);
      })
      // .call(drag);
  }, [onMouseover]);

  return <div className="map" ref={d3Container}></div>;
};

export default Map;
