import React, { useState, useCallback } from 'react';
import './App.css';
import Map from './Map.js'
import BudgetComparison from './BudgetComparison'
import PoliceToCivilianRatio from './PoliceToCivilianRatio'
import MoneyPerResident from './MoneyPerResident'

function App() {

  // remember to do css for mobile

  const [selectedCity, setSelectedCity] = useState(null);
  const onMouseover = useCallback((newCity) => { setSelectedCity(newCity)}, [])
  const onMouseOut = useCallback(() => { setSelectedCity(null)}, [])

  return (
    <div className="App">
      <h1>Map of the States</h1>
      <div className="vis-body">
      <div className="left-column">
        <Map className="map"
            onMouseover={onMouseover}
            onMouseOut={onMouseOut}/>
        <BudgetComparison className="budget-comparison" />
      </div>
      <div className="right-column">
        <MoneyPerResident className="money-per-resident" />
        <PoliceToCivilianRatio className="police-to-civilian-ratio" />
      </div>
      </div>
    </div>
  );
}

export default App;

