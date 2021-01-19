import React from "react";
import * as d3 from "d3";
import "./styles.css";
import { City } from "../City";

export const BudgetComparison: React.FC<{ selectedCity: City }> = ({
  selectedCity,
}) => {
  if (!selectedCity) {
    return <div className="budget-comparison"></div>;
  }

  const numberWithCommas = (n: number) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const policingBudget = selectedCity.overall_policing_budget;
  const percentPolicingBudget = selectedCity.percent_city_funds_spent_on_policing;
  const totalBudget = (policingBudget * 100) / percentPolicingBudget;
  const otherBudget = Math.round(totalBudget - policingBudget);
  const policingBudgetString = "$" + numberWithCommas(policingBudget);
  const otherBudgetString = "$" + numberWithCommas(otherBudget);

  const budgetToPixels = d3
    .scaleLinear()
    .domain([1, totalBudget])
    .range([30, 150]); // values chosen so that text can fit comfortably inside both arrows

  // keep this greater than 400px so the curve paths can still look good
  const curvyArrowWidth = 800
  const curvyArrowHeight = budgetToPixels(policingBudget)
  const arrowWidth = 900
  const arrowHeight = budgetToPixels(otherBudget)
  const gapBetweenArrows = 0

  const createPolicingBudgetArrow = () => {
    const path =
    // move to x = 0, y = below the Other budget arrow (+ 5 for spacing for now)
    `M 0 ${arrowHeight + gapBetweenArrows}` +
    // top horizontal line
    ` H  ${curvyArrowWidth *0.6}` +
    // top curve
    ` C  ${curvyArrowWidth*0.9} ${arrowHeight + gapBetweenArrows}  
         ${curvyArrowWidth*0.9} ${arrowHeight + 120}   
         ${curvyArrowWidth*0.9} ${arrowHeight + 150}` +
    // these two Ls are the arrow pointing part
    ` L ${curvyArrowWidth*0.9 - curvyArrowHeight/2} ${arrowHeight + curvyArrowHeight/2 + 150}
      L ${curvyArrowWidth*0.9 - curvyArrowHeight} ${arrowHeight + 150}` +
    // bottom curve
    ` C ${curvyArrowWidth*0.9 - curvyArrowHeight} ${arrowHeight + 120}
        ${curvyArrowWidth*0.9 - curvyArrowHeight} ${arrowHeight + curvyArrowHeight + gapBetweenArrows}
        ${curvyArrowWidth*0.6} ${arrowHeight + curvyArrowHeight + gapBetweenArrows}` +
    // bottom horizontal line
    ` H 0` +
    // vertical line back to start of this polygon
    ` V ${arrowHeight + gapBetweenArrows}`
    return path
  }

  const createOtherBudgetArrow = () => {
    const path = 
    // move to 0, 0
    `M 0 0 ` + 
    // draw a horizontal line from (0, 0) to (0, arrowWidth)
    `H ${arrowWidth} ` + 
    // these two lines draw the arrow's point
    `L ${arrowWidth + arrowHeight/2} ${arrowHeight/2} 
     L ${arrowWidth} ${arrowHeight}` + 
    // draw a horizontal line to (0, arrowWidth)
    ` H 0 V 0`
    return path
  }

  return (
    <div className="budget-comparison">
      {policingBudget && percentPolicingBudget && (
        <svg viewBox="200 -150 600 600" className="svg-arrows">
          <text 
            className="other-budget-text" 
            x="0" 
            y={arrowHeight*.5 + 20}>
              {otherBudgetString}
          </text> 
          <path
            className="other-budget-arrow"
            d={createOtherBudgetArrow()}
          ></path>
          <text 
            className="policing-budget-text" 
            x="0" 
            y={arrowHeight + curvyArrowHeight*.5 + 15}>
              {policingBudgetString}
          </text>
          <path
            className="policing-budget-arrow"
            d={createPolicingBudgetArrow()}
          ></path>
        </svg>
      )}
    </div>
  );
};

export default BudgetComparison;
