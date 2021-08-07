import React, { useState } from "react"

//icons
import search from "../svg/search.svg"

export default function Info({ setWeather }) {

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
                    <img src={search} className="search"></img>
                </div>
            </form>
        </div>
    )
}