import React, { useState, useEffect } from "react";
import "./style.css"

//components
import Info from './components/Info';

//img
import clear from "./svg/clear.svg";
import clouds from "./svg/clouds.svg"
import rain from "./svg/rain.svg"
import snow from "./svg/snow.svg"

//context
import { ThemeProvider} from './ThemeContext';

function App() {

  //ask for coords
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetch(`http://localhost:4000/api/weather?lat=${parseInt(pos.coords.latitude)}&lon=${parseInt(pos.coords.longitude)}`)
      .then((res) => res.json())
      .then((data) => setWeather(data));
    })
  }, [])

  const [weather, setWeather] = useState(null);
  const [toggle, setToggle] = useState(false);

  //metric switcher
  const minmax = () => {
    if (toggle) return parseInt(weather.main.temp * 1.8 -459.67) + "°F"
    return parseInt(weather.main.temp - 273.15) + "°C"
  }

  //weather icon
  const iconChanger = (str) => {
    switch(str) {
      case "Clouds":
        return clouds
      case "Rain": case "Drizzle": case "Thunderstorm":
        return rain
      case "Snow":
        return snow
      default:
        return clear
    }
  }

  //get local time
  const timeZone = () => {
    const getTime = new Date();
    return getTime.toLocaleDateString();
  }

  const weatherCard = () => {
    if (!weather) return (null)
    return (
      <div className="left-side_display">
        <p className="temp">{minmax()}</p>
        <div className="display_icon">
          <img src={iconChanger(weather.weather[0].main)}></img>
          <p>{weather.weather[0].description}</p>
        </div>
        <div>
          <p>{weather.name}</p>
          <p>{timeZone()}</p>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <div className="left-side">
        <h1>Weather App</h1>
        {weatherCard()}
      </div>
      <Info weather={weather} setWeather={setWeather} toggle={toggle} setToggle={setToggle} />
    </ThemeProvider>
  );
}

export default App;
