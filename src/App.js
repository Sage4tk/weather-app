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
import { useTheme } from './ThemeContext';

function App() {
  //theme
  const themeAge = useTheme();

  //list state for responsiveness
  const [showList, setShowList] = useState(false);

  //inline css
  const mainStyle = {
    backgroundColor: themeAge ? "#1f1f1f" : "#7BAFCF"
  }
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
          <img src={iconChanger(weather.weather[0].main)} alt="weather icon"></img>
          <p>{weather.weather[0].description}</p>
        </div>
        <div className="country">
          <p>{weather.name}</p>
          <p>{timeZone()}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="left-side" style={mainStyle}>
        <h1>Weather App</h1>
        <div className="burger" onClick={() => setShowList(!showList)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        {weatherCard()}
      </div>
      <Info weather={weather} setWeather={setWeather} toggle={toggle} setToggle={setToggle} showList={showList} />
    </>
  );
}

export default App;
