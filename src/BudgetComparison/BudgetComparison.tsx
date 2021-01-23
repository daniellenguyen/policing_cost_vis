import React from "react";
import * as d3 from "d3";
import "./styles.css";
import { City } from "../City";
import { useMediaQuery } from "beautiful-react-hooks";

export const BudgetComparison: React.FC<{ selectedCity: City }> = ({
  selectedCity,
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 1200px)");

  if (!selectedCity) {
    return <div className="budget-comparison"></div>;
  }

  const numberWithCommas = (n: number) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const findCostInWords = (n: number) => {
    const stringifiedReversed = n.toString().split("").reverse();
    const numOfDigits = stringifiedReversed.length;
    let costInWords = "";
    let digitToStartAt = null;
    if (numOfDigits <= 9) {
      costInWords = " million dollars"
      digitToStartAt = 6
    } else {
      costInWords = " billion dollars"
      digitToStartAt = 9
    }
    for (var i = digitToStartAt; i < stringifiedReversed.length; i++) {
      costInWords = stringifiedReversed[i].toString() + costInWords
    }
    return costInWords;
  };

  const policingBudget = selectedCity.overall_policing_budget;
  const percentPolicingBudget =
    selectedCity.percent_city_funds_spent_on_policing;
  const totalBudget = (policingBudget * 100) / percentPolicingBudget;
  const otherBudget = Math.round(totalBudget - policingBudget);
  const policingBudgetString = "$" + numberWithCommas(policingBudget);
  const otherBudgetString = "$" + numberWithCommas(otherBudget);
  const policingBudgetInWords = findCostInWords(policingBudget)

  const budgetToPixels = d3
    .scaleLinear()
    .domain([1, totalBudget])
    .range([30, 150]); // values chosen so that text can fit comfortably inside both arrows

  // keep this greater than 400px so the curve paths can still look good
  const curvyArrowWidth = 500;
  const curvyArrowHeight = budgetToPixels(policingBudget);
  const arrowWidth = 600;
  const arrowHeight = budgetToPixels(otherBudget);
  const gapBetweenArrows = 0;
  const arrowsStartY = 60;

  const createPolicingBudgetArrow = () => {
    const path =
      // move to x = 0, y = below the Other budget arrow (+ 5 for spacing for now)
      `M 0 ${arrowHeight + gapBetweenArrows + arrowsStartY}` +
      // top horizontal line
      ` H  ${curvyArrowWidth * 0.6}` +
      // top curve
      ` C ${curvyArrowWidth * 0.9} ${
        arrowHeight + gapBetweenArrows + arrowsStartY
      }  
          ${curvyArrowWidth * 0.9} ${arrowHeight + arrowsStartY + 120}   
          ${curvyArrowWidth * 0.9} ${arrowHeight + arrowsStartY + 150}` +
      // these two Ls are the arrow pointing part
      ` L ${curvyArrowWidth * 0.9 - curvyArrowHeight / 2} 
          ${arrowHeight + arrowsStartY + curvyArrowHeight / 2 + 150}
        L ${curvyArrowWidth * 0.9 - curvyArrowHeight} ${
        arrowHeight + arrowsStartY + 150
      }` +
      // bottom curve
      ` C ${curvyArrowWidth * 0.9 - curvyArrowHeight} ${
        arrowHeight + arrowsStartY + 120
      }
        ${curvyArrowWidth * 0.9 - curvyArrowHeight} ${
        arrowHeight + curvyArrowHeight + gapBetweenArrows + arrowsStartY
      }
        ${curvyArrowWidth * 0.6} ${
        arrowHeight + curvyArrowHeight + gapBetweenArrows + arrowsStartY
      }` +
      // bottom horizontal line
      ` H 0` +
      // vertical line back to start of this polygon
      ` V ${arrowHeight + gapBetweenArrows + arrowsStartY}`;
    return path;
  };

  const createOtherBudgetArrow = () => {
    const path =
      // move to x = 0, y = the arrow start position
      `M 0 ${arrowsStartY} ` +
      // draw a horizontal line from (0, 0) to (0, arrowWidth)
      `H ${arrowWidth} ` +
      // these two lines draw the arrow's point
      `L ${arrowWidth + arrowHeight / 2} ${arrowHeight / 2 + arrowsStartY} 
       L ${arrowWidth} ${arrowHeight + arrowsStartY}` +
      // draw a horizontal line to (0, arrow start position)
      ` H 0 V ${arrowsStartY}`;
    return path;
  };

  const createBracket = () => {
    const path =
      // move to -20 units above arrows
      `M 30 -20` +
      // first diagonal line
      `L -20 30` +
      // vertical line
      `V ${arrowHeight + curvyArrowHeight + 100}` +
      // second horizontal line
      `L 10 ${arrowHeight + curvyArrowHeight + 130}` +
      // little blip horizontal line
      `M -20 ${(arrowHeight + curvyArrowHeight + 130) / 2 - 15} H -40`;
    return path;
  };

  return (
    <div className="budget-comparison">
      <p className="budget-comparison-explainer">
        {isSmallScreen ? selectedCity.City : "This city"} spent{" "}
        {policingBudgetInWords} on policing in 2019
      </p>
      {policingBudget && percentPolicingBudget && (
        <svg
          viewBox={isSmallScreen ? "-350 -40 1300 700" : "0 0 600 600"}
          preserveAspectRatio="xMidYMid meet"
          className="svg-arrows"
        >
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#006666" />
              <stop offset="95%" stopColor="aquamarine" />
            </linearGradient>
          </defs>
          <path className="bracket" d={createBracket()}></path>
          <path
            className="other-budget-arrow"
            d={createOtherBudgetArrow()}
          ></path>
          <path
            className="policing-budget-arrow"
            d={createPolicingBudgetArrow()}
            fill="url(#gradient)"
          ></path>
          <text
            className="total-budget-text"
            x="-50"
            y="130"
            textAnchor="end"
            text-length="100"
          >
            {selectedCity.City}'s
          </text>
          <text
            className="total-budget-text"
            x="-50"
            y="165"
            text-length="100"
            textAnchor="end"
          >
            total budget
          </text>
          <text
            className="other-budget-text"
            x="0"
            y={arrowHeight * 0.5 + 20 + arrowsStartY}
          >
            {otherBudgetString}
          </text>
          <text
            className="policing-budget-text"
            x="0"
            y={arrowHeight + curvyArrowHeight * 0.5 + 15 + arrowsStartY}
          >
            {policingBudgetString}
          </text>
          <text
            className="everything-else-text"
            x={arrowWidth + arrowHeight / 2 + 10}
            y={arrowHeight / 2 + arrowsStartY + 5}
          >
            everything else
          </text>
          <image
            className="budget-comparison-officer"
            href="/policing_cost_vis/officer-large.png"
            x={curvyArrowWidth - curvyArrowHeight / 2 - 150}
            y={arrowHeight + arrowsStartY + 200}
            width="200"
            height="200"
          ></image>
        </svg>
      )}
    </div>
  );
};

export default BudgetComparison;
