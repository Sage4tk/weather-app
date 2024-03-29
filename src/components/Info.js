import React, { useState, useEffect } from "react"
import { useTheme, useThemeUpdate } from "../ThemeContext";

//icons
import search from "../svg/search.svg"

//components
import List  from "./List";

export default function Info({ weather, setWeather, toggle, setToggle, showList }) {
    //theme converter
    const theme = useTheme();
    const setTheme = useThemeUpdate();

    const infoStyle = {
        backgroundColor: theme ? "#0f0f0f":"#628CA6"
    }

    //conver metric system
    const toggler = () => {
        setToggle(!toggle);
        localStorage.setItem('units', !toggle);
    }

    //dark theme toggler
    
    const [darkTheme, setDarkTheme] = useState(false)

    const toggleDark = () => {
        setDarkTheme(!darkTheme);
        localStorage.setItem('dark', !darkTheme);
        setTheme();
    }

    //checks if previous settingsn
    useEffect(() => {
        const themeBool = localStorage.getItem('dark');
        const unitBool = localStorage.getItem('units');
        if (themeBool === "true") {
            setTheme();
            setDarkTheme(!darkTheme)
        }

        if (unitBool === "true") {
            setToggle(true);
        }
    }, [])


    //form handler
    const [formHandler, setForm] = useState({
        city: ""
    })

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://zackpersonalapi.herokuapp.com/api/weather?city=${formHandler.city}`);
            const data = await res.json();
            console.log(data.main.temp);
            setWeather(data)
            setForm({city: ""});
        } catch (err) {
            console.log(err)
        }
    }

    const changeHandler = (e) => {
        setForm({
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={showList? "info-bar show":"info-bar"} style={infoStyle}>
            <form onSubmit={submit}>
                <div className="form-control">
                    <input type="text" placeholder="Type your city" name="city" onChange={changeHandler} value={formHandler.city} />
                    <button type="submit"><img src={search} className="search" alt="search button"></img></button>
                </div>
            </form>
            <List weather={weather} toggle={toggle} />
            <div className="switch-controller">
                <div className="switch" onClick={toggler}>
                    <input type="checkbox" checked={toggle} readOnly={true}/>
                    <span className="slider round"></span>
                </div>
                <p>Measurement Converter</p>
            </div>
            <div className="switch-controller">
                <div className="switch" onClick={toggleDark}>
                    <input type="checkbox" checked={darkTheme} readOnly={true}/>
                    <span className="slider round"></span>
                </div>
                <p>Dark Mode</p>
            </div>
        </div>
    )
}