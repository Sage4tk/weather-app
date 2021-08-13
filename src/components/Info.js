import React, { useState } from "react"

//icons
import search from "../svg/search.svg"

//components
import List  from "./List";

export default function Info({ weather, setWeather, toggle, setToggle }) {
    //conver metric system
    
    const toggler = () => {
        setToggle(!toggle);
    }


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
        <div className="info-bar">
            <form onSubmit={submit}>
                <div className="form-control">
                    <input type="text" placeholder="Type your city" name="city" onChange={changeHandler} value={formHandler.city} />
                    <button type="submit"><img src={search} className="search"></img></button>
                </div>
            </form>
            {/* <div className="switch" onClick={toggler}>
                <input type="checkbox" checked={toggle} readOnly={true}/>
                <span className="slider round"></span>
            </div> */}
            <List weather={weather} toggle={toggle} />
        </div>
    )
}