import React, { useState, useCallback } from "react";
import "./App.css";
import Map from "./Map/Map.js";
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
      <h1 className={selectedCity ? "location selected" : "location"}>
        {locationName}
      </h1>
      <div className="vis-body">
        <div className={selectedCity ? "top-row selected" : "top-row"}>
          <BudgetComparison selectedCity={selectedCity} />
          <BudgetPerCapita selectedCity={selectedCity} />
          <PoliceToCivilianRatio selectedCity={selectedCity} />
        </div>
        <Map onMouseover={onMouseover} selectedCity={selectedCity} />
      </div>
    </div>
  );
};

export default App;
