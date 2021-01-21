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
      <div className="title">
        <img
          className="title-image"
          alt="title with people mosaic"
          src="policing_cost_vis/title-image.png"
        />
        <div className="title-card">
          <img
            className="officer"
            alt="police officer icon"
            src="policing_cost_vis/officer-large.png"
          ></img>
          <h1 className="title-text">The Cost of Policing in America</h1>
        </div>
      </div>
      <p className="explanation">
        This is an interactive exploration of how various cities in the U.S.
        fund their local police forces. The data behind it was compiled by
        the&nbsp;
        <a href="https://www.vera.org/publications/what-policing-costs-in-americas-biggest-cities">
          Vera Institute of Justice
        </a>
        , which gathered it from datasets made public by each city's government.
        <br />
        <br />
        With the exception of the policeman, which is a stock image, none of the
        photos shown in this visualization are of real people. They were
        generated using&nbsp;
        <a href="https://thispersondoesnotexist.com">
          thispersondoesnotexist.com.
        </a>{" "}
        It has the advantage of not requiring anyone's consent, but the
        disadvantage of not being trained on a very racially diverse dataset.{" "}
      </p>
      <div className="visualization">
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
    </div>
  );
};

export default App;
