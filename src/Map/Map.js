import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import "./styles.css";
import citiesData from "../data/us_cities_with_FID.json";
import statesOutline from "../data/states_outline.json";

// Had to slightly change long/lat manually for some cities so they wouldn't overlap.
// Here are the original long/lat for those cities:
// - Fort Worth longitude: -97.4294026
// - Dallas longitude: -96.8716261
// - Newark latitude: 40.7313432
// - New York latitutde 40.6976637
// - New York longitude -74.1197639

const Map = ({ onMouseover, selectedCity }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    const svgContainer = d3.select(d3Container.current).select(".svg-content");
    const path = d3.geoPath();

    svgContainer
      .append("path")
      .attr(
        "d",
        path(topojson.mesh(statesOutline, statesOutline.objects.states))
      )
      .style("stroke", "gray")
      .style("stroke-width", 0.5)
      .style("fill", "none");

    const nodes = svgContainer
      .selectAll("circle")
      .data(citiesData)
      .enter()
      .append("circle")
      .attr("class", (d) => "circle-" + d.Index.toString())
      .attr("r", 4)
      .attr("cx", (d) => d.cx)
      .attr("cy", (d) => d.cy)
      .style("stroke", "#7df9ff")
      .style("fill", "#7df9ff")
      .on("mouseover", function (d, i) {
        if (!this.classList.contains("clicked")) {
          d3.select(this).style("stroke", "black");
          d3.select(d3Container.current)
            .select(".text-" + i.Index.toString())
            .style("font-weight", "bold");
        }
      })
      .on("mouseout", function (d, i) {
        if (!this.classList.contains("clicked")) {
          d3.select(this).style("stroke", "#7df9ff");
          d3.select(d3Container.current)
            .select(".text-" + i.Index.toString())
            .style("font-weight", "normal");
        }
      })
      .on("click", function (d, i) {
        nodes
          .attr("class", (d) => "circle-" + d.Index.toString())
          .style("stroke", "#7df9ff");
        cityNames
          .attr("class", (d) => "text-" + d.Index.toString())
          .style("font-weight", "normal");
        
        d3.select(d3Container.current)
          .select(".text-" + i.Index.toString())
          .attr("class", "clicked")
          .style("font-weight", "bold");
        d3.select(this)
          .attr("class", "clicked")
          .style("stroke", "black");

        onMouseover(i);
      });

    // Makes map labels draggable. 
    // Used this to determine new coordinates for labels relative to their nodes.
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
      .attr("class", (d) => "text-" + d.Index.toString())
      .attr("x", (d) => d.labelx + 3)
      .attr("y", (d) => d.labely - 3)
      .text((d) => d.City)
      .style("user-select", "none")
      .style("font", "14px arial")
      .style("cursor", "pointer")
      .on("mouseover", function (d, i) {
        if (!this.classList.contains("clicked")) {
          d3.select(this).style("font-weight", "bold");
          d3.select(d3Container.current)
            .select(".circle-" + i.Index.toString())
            .style("stroke", "black");
        }
      })
      .on("mouseout", function (d, i) {
        if (!this.classList.contains("clicked")) {
          d3.select(this).style("font-weight", "normal");
          d3.select(d3Container.current)
            .select(".circle-" + i.Index.toString())
            .style("stroke", "none");
        }
      })
      .on("click", function (d, i) {
        cityNames
          .attr("class", (d) => "text-" + d.Index.toString())
          .style("font-weight", "normal");
        nodes
          .attr("class", d => "circle-" + d.Index.toString())
          .style("stroke", "#7df9ff");
      
        d3.select(d3Container.current)
          .select(".circle-" + i.Index.toString())
          .attr("class", "clicked")
          .style("stroke", "black");
        d3.select(this)
          .attr("class", "clicked")
          .style("font-weight", "bold");

        onMouseover(i);
      });

    // .call(drag);
  }, [onMouseover]);

  return (
    <div className={selectedCity ? "map small-map" : "map"} ref={d3Container}>
      <svg
        preserveAspectRatio="xMidYMid meet"
        viewBox="-70 -30 1100 650"
        className="svg-content"
        height="100%"
        width="100%"
      ></svg>
    </div>
  );
};
export default Map;
