import React from "react"

//icons
import search from "../svg/search.svg"

export default function Info() {
    return (
        <div className="info-bar">
            <form>
                <div className="form-control">
                    <input type="text" placeholder="Type your city" />
                    <img src={search} className="search"></img>
                </div>
            </form>
        </div>
    )
}