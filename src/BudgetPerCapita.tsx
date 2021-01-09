import React from "react";
import "./BudgetPerCapita.css";
import { City } from "./City";

export const BudgetPerCapita: React.FC<{ selectedCity: City }> = ({
  selectedCity,
}) => {

  if (!selectedCity) {
    return <div className="budget-per-capita">hello</div>;
  }

  const budgetPerCapita = selectedCity.policing_budget_per_capita
  const budgetMessage = `Every resident in this city spent $${budgetPerCapita} on policing in 2019`

  return (
  <div className="budget-per-capita">{budgetMessage}</div>
  );
};

export default BudgetPerCapita;
