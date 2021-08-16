import React, { useState } from "react"
import { useTheme, useThemeUpdate } from "../ThemeContext";

//icons
import search from "../svg/search.svg"

//components
import List  from "./List";

export default function Info({ weather, setWeather, toggle, setToggle }) {
    //theme converter
    const theme = useTheme();
    const setTheme = useThemeUpdate();

    const infoStyle = {
        backgroundColor: theme ? "#0f0f0f":"rgba(0, 0, 0, 0.200)"
    }

    //conver metric system
    const toggler = () => {
        setToggle(!toggle);
    }

    //dark theme toggler
    const [darkTheme, setDarkTheme] = useState(false)

    const toggleDark = () => {
        setDarkTheme(!darkTheme);
        setTheme();
    }

    //form handler
    const [formHandler, setForm] = useState({
        city: ""
    })

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:4000/api/weather?city=${formHandler.city}`);
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
        <div className="info-bar" style={infoStyle}>
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