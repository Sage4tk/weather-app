import React, { useState } from "react";
import "./style.css"

//components
import Info from './components/Info';

function App() {
  const [weather, setWeather] = useState(null);

  const weatherTemp = () => {
    if (!weather) return (null) 
    return (
      <h2>{parseInt(weather.main.temp - 273.15)}</h2>
    )
  }

  return (
    <>
      <div className="left-side">
        <h1>Weather App</h1>
        {weatherTemp()}
      </div>
      <Info setWeather={setWeather} />
    </>
  );
}

export default App;
