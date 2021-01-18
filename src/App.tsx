import React, { useState, useCallback } from "react";
import "./App.css";
import Map from "./Map.js";
import BudgetComparison from "./BudgetComparison/BudgetComparison";
import PoliceToCivilianRatio from "./PoliceToCivilianRatio/PoliceToCivilianRatio";
import BudgetPerCapita from "./BudgetPerCapita/BudgetPerCapita";
import { City } from "./City";

export const App: React.FC = () => {
  // remember to do css for mobile

  const [selectedCity, setSelectedCity] = useState<City>(null);
  const onMouseover = useCallback((newCity: City) => {
    setSelectedCity(newCity);
  }, []);
  const locationName = selectedCity
    ? selectedCity?.City + ", " + selectedCity?.State
    : "Map of the States";

  return (
    <div className="App">
      <div className="header">
        <h1>{locationName}</h1>
      </div>
      <div className="vis-body">
        <div className="left-column">
          <Map onMouseover={onMouseover} />
          <BudgetComparison selectedCity={selectedCity} />
        </div>
        <div className="right-column">
          <BudgetPerCapita selectedCity={selectedCity} />
          <PoliceToCivilianRatio selectedCity={selectedCity} />
        </div>
      </div>
    </div>
  );
};

export default App;
