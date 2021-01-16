import React from "react";
import * as d3 from "d3";
import "./styles.css";
import { City } from "../City";

export const BudgetComparison: React.FC<{ selectedCity: City }> = ({
  selectedCity,
}) => {
  // if (!selectedCity) {
  //   return <div className="budget-comparison"></div>;
  // }

  // const policingBudget = selectedCity.overall_policing_budget;
  // const percentPolicingBudget =
  //   selectedCity.percent_city_funds_spent_on_policing;
  // const totalBudget = (policingBudget * 100) / percentPolicingBudget;
  // const otherBudget = totalBudget - policingBudget;

  // const budgetToPixels = d3
  //   .scaleLinear()
  //   .domain([1, totalBudget])
  //   .range([1, 100]);
  const arrowHeight = 100
  const arrowWidth = 900
  const pathString = "M 0 0 H " + arrowWidth + " L " + (arrowWidth + arrowHeight/2) + " " + (arrowHeight/2) + " L " + arrowWidth + " " + arrowHeight + " H 0"
  const curvyArrowHeight = 100
  const curvyArrowWidth = 900
  const curvyPathString = "M 0 " + (arrowHeight + 5) + 
  " H " + (curvyArrowWidth *0.6) + 
  " C " + (curvyArrowWidth*0.9) + " " + (arrowHeight + 15) + " " + (curvyArrowWidth*0.9)+ " " + (arrowHeight + 270) + " " +  (curvyArrowWidth*0.9) + " " + (arrowHeight + 300) +
  // " L " + (curvyArrowWidth *0.6 + 200) + " " + (curvyArrowHeight*3.6) + // these two Ls are the arrow
  // " L " + (curvyArrowWidth *0.6 + 175) + " " + (curvyArrowHeight*5) +
  " M " + (curvyArrowWidth*0.9 - curvyArrowHeight) + " " + (arrowHeight + 300) + // move to L directly above
  " C " + (curvyArrowWidth*0.9) + " " + (arrowHeight + curvyArrowHeight + 15) + " " + (curvyArrowWidth*0.9 - curvyArrowHeight)+ " " + (arrowHeight + curvyArrowHeight + 5) + " " + curvyArrowWidth*0.6 + " " + (arrowHeight + curvyArrowHeight + 5) +
  " H 0"+
  " V " + (arrowHeight + 5)

  return (
    <div className="budget-comparison">
      {/* {policingBudget && percentPolicingBudget && (
        <>
          <div
            className="other-budget-arrow"
            style={{ height: budgetToPixels(otherBudget) }}
          ></div>
          <div
            className="policing-budget-arrow"
            style={{ height: budgetToPixels(policingBudget) }}
          ></div>
        </>
      )} */}
      <svg viewBox="0 0 1000 1000">
        {/* <path d="M 0 0 H 90 L 120 45 L 90 90 H 10" /> */}
        <path d={pathString}/>
        <path fill="none" stroke="purple" stroke-width="2" d={curvyPathString}/>
        {/* <path id="svg_23" d="M0,105
                H 500
        c232,0 225.33333,228 224.66667,226.66667
        L 702 365
        L 678 334
        c-0.66667,-1.33333 4.66667,-186.66667 -160.66667,-186.66667
        H 0
        V 105" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="1" stroke="#000000" fill="none"/> */}
      </svg>
    </div>
  );
};

export default BudgetComparison;
