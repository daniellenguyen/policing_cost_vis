import React from "react";
import "./styles.css";
import { City } from "../City";
import { useMediaQuery } from "beautiful-react-hooks";

export const BudgetPerCapita: React.FC<{ selectedCity: City }> = ({
  selectedCity,
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 1200px)");

  if (!selectedCity) {
    return <div className="budget-per-capita">hello</div>;
  }

  const budgetPerCapita = selectedCity.policing_budget_per_capita;
  const budgetMessage = `Every taxpayer ${
    isSmallScreen ? " in " + selectedCity.City : "here"
  } spent $${budgetPerCapita} on policing in 2019, or about this much`;

  const addHundredDollarBills = () => {
    const numberOfBills = Math.round(budgetPerCapita / 100);
    return Array.from({ length: numberOfBills }, (v, k) => k + 1).map((n) => (
      <img
        className="hundred"
        key={n}
        alt="hundred-dollars"
        src="/policing_cost_vis/hundred.jpeg"
      ></img>
    ));
  };

  return (
    <div className="budget-per-capita">
      <p className="budget-message">{budgetMessage}</p>
      {addHundredDollarBills()}
    </div>
  );
};

export default BudgetPerCapita;
