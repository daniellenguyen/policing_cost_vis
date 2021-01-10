import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
// import { forceCluster } from 'd3-force-cluster'
// import { drag } from 'd3-drag'
import "./styles.css";
import { City } from "../City";
import imageData from "../data/faces_data.json";
import { Simulation, SimulationNodeDatum, BaseType, Selection } from "d3";

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const PoliceToCivilianRatio: React.FC<{ selectedCity: City }> = ({
  selectedCity,
}) => {
  const ratio =
    (selectedCity?.police_dept_employee_to_resident_ratio as number) + 1; // extra 1 for the police officer node
  const prevRatio = usePrevious(ratio);
  const d3Container = useRef(null);
  const [graphRendered, setGraphRendered] = useState(false);
  const message = selectedCity
    ? `1 police officer for every ${ratio} people`
    : "";

  const simulation = useRef<Simulation<SimulationNodeDatum, undefined>>();
  const nodes = useRef<
    Selection<BaseType, { image: string; diameter: number }, BaseType, unknown>
  >();

  const ticked = (nodes: any) => {
    nodes
      .attr("x", (d: any) => (d as any).x)
      .attr("y", (d: any) => (d as any).y);
  };

  useEffect(() => {
    if (
      ratio &&
      prevRatio &&
      d3Container.current &&
      simulation.current &&
      nodes.current
    ) {

      nodes.current = d3
        .select(".graph-container")
        .selectAll("image")
        .data(imageData.slice(0, ratio));

      if (ratio > prevRatio) {
        nodes.current
          .enter()
          .append("image")
          .attr("height", (d) => 0)
          .attr("width", (d) => 0)
          .attr("transform", "translate(500, 800)")
          .transition()
          .attr("href", (d) => (d as any).image)
          .attr("x", (d) => (d as any).x)
          .attr("y", (d) => (d as any).y)
          .attr("height", 50)
          .attr("width", 50)

      } else if (ratio < prevRatio) {
        nodes.current
          .exit()
          .transition()
          .attr("height", (d) => 0)
          .attr("width", (d) => 0)
          .remove();
      }

      simulation.current
      .nodes(imageData.slice(0, ratio) as SimulationNodeDatum[]).alphaTarget(0.3).restart().on("tick", () => ticked(nodes.current))

      nodes.current = d3
      .select(".graph-container")
      .selectAll("image")
      .data(imageData.slice(0, ratio));

    if (ratio > prevRatio) {
      nodes.current
        .enter()
        .append("image")
        .attr("height", (d) => 0)
        .attr("width", (d) => 0)
        .attr("transform", "translate(500, 800)")
        .transition()
        .attr("href", (d) => (d as any).image)
        .attr("x", (d) => (d as any).x)
        .attr("y", (d) => (d as any).y)
        .attr("height", 50)
        .attr("width", 50)

    } else if (ratio < prevRatio) {
      nodes.current
        .exit()
        .transition()
        .attr("height", (d) => 0)
        .attr("width", (d) => 0)
        .remove();
    }

    simulation.current = d3
    .forceSimulation(imageData.slice(0, ratio) as any)
    .alphaTarget(0.3)
    .velocityDecay(0.1)
    .force("x", d3.forceX().strength(0.002))
    .force("y", d3.forceY().strength(0.002))
    .force(
      "collision",
      d3
        .forceCollide()
        .radius((d) => (d as any).diameter + 0.5)
        .iterations(2)
    );

    simulation.current
    .nodes(imageData.slice(0, ratio) as SimulationNodeDatum[]).alphaTarget(0.3).restart().on("tick", () => ticked(nodes.current))

    }
  }, [ratio, prevRatio, simulation, nodes]);

  const initialGraph = () => {
    nodes.current = d3
      .select(d3Container.current)
      .select(".graph-container")
      .selectAll("image")
      .data(imageData.slice(0, ratio));

    nodes.current
      .enter()
      .append("image")
      .attr("href", (d) => (d as any).image)
      .attr("x", (d) => (d as any).x)
      .attr("y", (d) => (d as any).y)
      .attr("height", 50)
      .attr("width", 50)
      .attr("transform", "translate(500, 800)")

    simulation.current = d3
      .forceSimulation(imageData.slice(0, ratio) as any)
      .alphaTarget(0.3)
      .velocityDecay(0.1)
      .force("x", d3.forceX().strength(0.002))
      .force("y", d3.forceY().strength(0.002))
      .force(
        "collision",
        d3
          .forceCollide()
          .radius((d) => (d as any).diameter + 0.5)
          .iterations(2)
      );

    simulation.current.on("tick", () => ticked(nodes.current));

    const drag = d3
      .drag()
      .on("drag", function (this: any, event: DragEvent, d: any) {
        d3.select(this)
          .attr("x", (d.x = event.x))
          .attr("y", (d.y = event.y));
      })
      .on("start", (event: any) => {
        if (!event.active && simulation.current) {
          simulation.current.alphaTarget(0.3).restart();
        }
      });

    d3.select(d3Container.current)
      .select('[href="citizen_photos/officer.png"]')
      .attr("height", 200)
      .attr("width", 200)
      .call(drag as any);
  };

  if (!graphRendered && selectedCity) {
    initialGraph();
    setGraphRendered(true);
  }

  return (
    <div className="police-to-civilian-ratio" ref={d3Container}>
      <svg
        preserveAspectRatio="xMidYMin meet"
        viewBox="0 0 1000 1000"
        className="graph-container"
      >
      </svg>
      {/* {selectedCity && <p className="message">{message}</p> } */}
    </div>
  );
};

export default PoliceToCivilianRatio;
