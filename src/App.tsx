import React, { useState, useCallback } from "react";
import "./App.css";
import Map from "./Map/Map.js";
import BudgetComparison from "./BudgetComparison/BudgetComparison";
import PoliceToCivilianRatio from "./PoliceToCivilianRatio/PoliceToCivilianRatio";
import BudgetPerCapita from "./BudgetPerCapita/BudgetPerCapita";
import { City } from "./City";
import { useMediaQuery } from "beautiful-react-hooks";

export const App: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 1200px)");
  const [selectedCity, setSelectedCity] = useState<City>(null);
  const onMouseover = useCallback((newCity: City) => {
    setSelectedCity(newCity);
  }, []);
  const locationName = selectedCity
    ? selectedCity?.City + ", " + selectedCity?.State
    : "Choose a city";

  return (
    <div className="App">
      <div className="title">
        <img
          className="title-image"
          alt="title with people mosaic"
          src="/policing_cost_vis/title-image.png"
        />
        <div className="title-card">
          <img
            className="officer"
            alt="police officer icon"
            src="/policing_cost_vis/officer-large.png"
          ></img>
          <h1 className="title-text">The Cost of Policing in America</h1>
        </div>
      </div>
      <p className="explanation first">
        This is an interactive exploration of how various cities in the U.S.
        fund their local police forces. The data behind it was compiled by the{" "}
        <a href="https://www.vera.org/publications/what-policing-costs-in-americas-biggest-cities">
          Vera Institute of Justice
        </a>
        , which gathered it from datasets made public by each city's government.
      </p>
      <p className="explanation second">
        With the exception of the policeman, which is a stock image, none of the
        photos shown in this visualization are of real people. They were
        generated using{" "}
        <a href="https://thispersondoesnotexist.com">
          thispersondoesnotexist.com
        </a>
        . This has the advantage of not requiring consent to show anyone's
        image, but the disadvantage of not being trained on a racially diverse
        dataset.
      </p>
      <div className="visualization">
        <h1 className="location">{locationName}</h1>
        <div className="vis-body">
          <div className={selectedCity ? "left-side selected" : "left-side"}>
            <div className={selectedCity ? "top-row selected" : "top-row"}>
              <BudgetComparison selectedCity={selectedCity} />
              <BudgetPerCapita selectedCity={selectedCity} />
            </div>
            {isSmallScreen && selectedCity !== null && (
              <h1 className="cta-reclick">Now choose another city</h1>
            )}
            <Map onMouseover={onMouseover} selectedCity={selectedCity} />
          </div>
          <PoliceToCivilianRatio selectedCity={selectedCity} />
        </div>
      </div>
    </div>
  );
};

export default App;
