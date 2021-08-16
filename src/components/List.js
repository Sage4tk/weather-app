import React from 'react';

export default function List({ weather, toggle }) {

    if (!weather) return (null)
    
    const minmax = (num) => {
        if (toggle) return parseInt(num * 1.8 -459.67) + " °F"
        return parseInt(num - 273.15) + " °C"
    }

    const windSpeed = (num) => {
        const kmh = num * 3.6;
        if (toggle) return (kmh / 1.609).toFixed(2) + " MPH";
        return kmh.toFixed(2) + " KM/H";
    }

    return (
        <div className="info-bar_inside">
            <p>Latitude: {weather.coord.lat.toFixed(2)}</p>
            <p>Longitude: {weather.coord.lon.toFixed(2)}</p>
            <hr />
            <p>Minimum Temperature: {minmax(weather.main.temp_min)}</p>
            <p>Maximum Temperature: {minmax(weather.main.temp_max)}</p>
            <hr />
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {windSpeed(weather.wind.speed)}</p>
            <hr/>
        </div>
    )
}