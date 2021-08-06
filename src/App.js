import React from "react";
import "./style.css"

//components
import Info from './components/Info';

function App() {
  return (
    <>
      <div className="left-side">
        <h1>Weather App</h1>
      </div>
      <Info />
    </>
  );
}

export default App;
