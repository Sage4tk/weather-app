import React from "react";

export default function List({ weather, toggle }) {
    if (!weather) return (null)
    
    const minmax = (num) => {
        if (toggle) return parseInt(num * 1.8 -459.67) + " °F"
        return parseInt(num - 273.15) + " °C"
    }

    return (
        <div className="info-bar_inside">
            <p>Latitude: {weather.coord.lat.toFixed(2)}</p>
            <p>Longitude: {weather.coord.lon.toFixed(2)}</p>
            <p>Minimum Temperature: {minmax(weather.main.temp_min)}</p>
            <p>Maximum Temperature: {minmax(weather.main.temp_max)}</p>
            <p>Humidity: {weather.main.humidity}</p>
        </div>
    )
}