import React, { useState } from "react";
import "./style.css"

//components
import Info from './components/Info';

//img
import clear from "./svg/clear.svg";

function App() {
  const [weather, setWeather] = useState(null);
  const [toggle, setToggle] = useState(false);

  const test = () => {
    if (toggle) return parseInt(weather.main.temp - 273.15)
    return parseInt(weather.main.temp * 1.8 -459.67)
  }

  const weatherCard = () => {
    if (!weather) return (null) 
    return (
      <div>
        <h2>{test()}</h2>
      </div>
    )
  }

  return (
    <>
      <div className="left-side">
        <h1>Weather App</h1>
        {weatherCard()}
      </div>
      <Info setWeather={setWeather} toggle={toggle} setToggle={setToggle} />
    </>
  );
}

export default App;
