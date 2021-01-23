import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./styles.css";
import { City } from "../City";
import imageData from "../data/faces_data.json";
import { Simulation, SimulationNodeDatum, BaseType, Selection } from "d3";
import { useMediaQuery } from 'beautiful-react-hooks'; 

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
  const isSmallScreen = useMediaQuery('(max-width: 1200px)'); 
  const ratio =
    (selectedCity?.police_dept_employee_to_resident_ratio as number) + 1; // extra 1 for the police officer node
  const prevRatio = usePrevious(ratio);
  const d3Container = useRef(null);
  const [graphRendered, setGraphRendered] = useState(false);
  const message = selectedCity
    ? `There's one police officer for every ${ratio} people here`
    : "";
  const nodes = useRef<
    Selection<BaseType, { image: string; diameter: number }, BaseType, unknown>
  >();
  const simulation = useRef<Simulation<SimulationNodeDatum, undefined>>();

  const ticked = (nodes: any) => {
    nodes
      .attr("x", (d: any) => (d as any).x)
      .attr("y", (d: any) => (d as any).y);
  };

  useEffect(() => {
    if (ratio && d3Container.current && simulation.current && nodes.current) {
      simulation.current
        .nodes(imageData.slice(0, ratio) as any)
        .alpha(1)
        .restart();
      const updateNodes = () => {
        nodes.current = d3
          .select(d3Container.current)
          .select(".graph-container")
          .selectAll("image")
          .data(imageData.slice(0, ratio));

        if (prevRatio !== undefined && !isNaN(prevRatio)) {
          if (ratio > prevRatio) {
            nodes.current
              .enter()
              .append("image")
              .attr("height", 0)
              .attr("width", 0)
              .attr("transform", "translate(500, 800)")
              .transition()
              .attr("href", (d) => (d as any).image)
              .attr("x", (d) => (d as any).x)
              .attr("y", (d) => (d as any).y)
              .attr("height", 50)
              .attr("width", 50);
          } else if (ratio < prevRatio) {
            nodes.current
              .exit()
              .transition()
              .attr("height", (d) => 0)
              .attr("width", (d) => 0)
              .remove();
          }
        }

        simulation.current
          ?.nodes(imageData.slice(0, ratio) as any)
          .alpha(1)
          .restart();
      };

      updateNodes();
      updateNodes();
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
      .attr("width", 50) // shouldn't it have to do with diameter too?
      .attr("transform", "translate(500, 800)");

    simulation.current = d3
      .forceSimulation(imageData.slice(0, ratio) as any)
      .velocityDecay(0.1)
      .alphaDecay(0.1)
      .alpha(1)
      .force("x", d3.forceX().strength(0.04))
      .force("y", d3.forceY().strength(0.02))
      .force(
        "collision",
        d3
          .forceCollide()
          .radius((d) => (d as any).diameter + 0.5)
          .iterations(2)
          .strength(0.5)
      )
      .on("tick", () => ticked(nodes.current));

    const drag = d3
      .drag()
      .on("start", (event: any) => {
        // if (simulation.current) {
          simulation.current?.alpha(0.4).restart();
        // }
      })
      .on("drag", function (this: any, event: DragEvent, d: any) {
        // if (simulation.current) {
          simulation.current?.alpha(0.4).restart();
        // }
        d3.select(this)
          .attr("x", (d.x = event.x))
          .attr("y", (d.y = event.y))
          .style("cursor", "grabbing");
      })
      .on("end", function (this: any, event: any, d: any) {
        d3.select(this).style("cursor", "grab")
      });

    d3.select(d3Container.current)
      .select('[href="/policing_cost_vis/officer-large.png"]')
      .attr("height", 200)
      .attr("width", 200)
      .attr("transform", "translate(425, 725)")
      .style("cursor", "grab")
      .call(drag as any);
  };

  if (!graphRendered && selectedCity) {
    initialGraph();
    setGraphRendered(true);
  }

  return (
    <div className={selectedCity ? "police-to-civilian-ratio selected" : "police-to-civilian-ratio"} id="police-to-civilian-ratio" ref={d3Container}>
      {selectedCity && <p className="message">{message}</p>}
      <svg
        preserveAspectRatio="xMidYMin meet"
        // if you change the viewbox size, you have to change the strength of collision and force x and y on the simulation too
        viewBox={isSmallScreen ? "-400 -200 2000 2000": "-400 -200 2000 2000"}
        className="graph-container"
      ></svg>
    </div>
  );
};

export default PoliceToCivilianRatio;
