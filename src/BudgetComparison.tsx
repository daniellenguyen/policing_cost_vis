import React from "react";
import * as d3 from "d3";
import "./BudgetComparison.css";
import { City } from "./City";

export const BudgetComparison: React.FC<{ selectedCity: City }> = ({
  selectedCity,
}) => {

  if (!selectedCity) {
    return <div className="budget-comparison"></div>;
  }

  const policingBudget = selectedCity.overall_policing_budget;
  const percentPolicingBudget =
    selectedCity.percent_city_funds_spent_on_policing;
  const totalBudget = (policingBudget * 100) / percentPolicingBudget;
  const otherBudget = totalBudget - policingBudget;

  const budgetToPixels = d3
    .scaleLinear()
    .domain([1, totalBudget])
    .range([1, 500]);

  return (
    <div className="budget-comparison">
      {policingBudget && percentPolicingBudget && (
        <>
          <div
            className="policing-budget"
            style={{ width: budgetToPixels(policingBudget) }}
          ></div>
          <div
            className="other-budget"
            style={{ width: budgetToPixels(otherBudget) }}
          ></div>
        </>
      )}
    </div>
  );
};

export default BudgetComparison;
