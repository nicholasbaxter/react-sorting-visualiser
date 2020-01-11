import React, { useState, useEffect } from "react";
import "./App.css";
import { Frame, Scroll, useCycle } from "framer";

function App() {
  const [numberOfBars, setNumberOfBars] = useState(30);
  const [randomArray, setRandomArray] = useState([]);

  useEffect(() => {
    randomise();
  }, []);

  // const items = [0, 12, 2, 35, 34, 4, 5, 16, 20, 33, 2, 10, 11, 46, 32, 4];

  //random generation of heights on pageload
  const randomise = () => {
    let array = Array.from({ length: numberOfBars }, () =>
      Math.floor(Math.random() * 60)
    );
    setRandomArray(array);
  };

  const sort = () => {
    console.log("sort");
  };

  return (
    <div
      style={{
        backgroundColor: "salmon",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {randomArray.map((item, i) => (
          <Frame
            style={{
              position: "relative",
              width: `${200 / randomArray.length}px`,
              height: `${item * 10}px`,
              margin: "1px"
            }}
            key={i}
            background={"rgba(44,44,255,0.7)"}
            radius={30}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <input
          type="number"
          name="numberOfBars"
          id="numberOfBars"
          value={numberOfBars}
          onChange={e => setNumberOfBars(e.target.value)}
        />
        <button onClick={() => randomise()}>Random</button>
        <button onClick={() => sort()}>Sort</button>
        {/* algorithm type */}
        {/* Speed Slider */}
      </div>
    </div>
  );
}

export default App;
