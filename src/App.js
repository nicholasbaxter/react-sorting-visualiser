import React, { useState, useEffect } from "react";
import "./App.css";
import { Flipper, Flipped } from "react-flip-toolkit";

function App() {
  const [numberOfBars, setNumberOfBars] = useState(30);
  const [randomArray, setRandomArray] = useState([]);
  const [speed, setSpeed] = useState(200);
  const [speedName, setSpeedName] = useState("medium");
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    randomise();
  }, [numberOfBars]);

  const handleSpeed = e => {
    if (e.target.value === "slowest") {
      setSpeed(2000);
      setSpeedName("slowest");
    }
    if (e.target.value === "slow") {
      setSpeed(1000);
      setSpeedName("slow");
    }
    if (e.target.value === "medium") {
      setSpeed(200);
      setSpeedName("medium");
    }
    if (e.target.value === "fast") {
      setSpeed(30);
      setSpeedName("fast");
    }
    if (e.target.value === "fastest") {
      setSpeed(1);
      setSpeedName("fastest");
    }
  };

  //random generation of heights on pageload
  const randomise = () => {
    let array = Array.from({ length: numberOfBars }, () =>
      Math.floor(Math.random() * 60)
    );
    setRandomArray(array);
  };

  const randNum = () => {
    return Math.random();
  };

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const getNum = index => {
    return sleep(speed).then(v => randomArray[index]);
  };

  const bubbleSort = async arr => {
    const length = arr.length;
    let swapped;
    do {
      swapped = false;
      for (var i = 0; i < length; i++) {
        const num = await getNum(i);
        setCurrentIndex(i);
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    return arr;
  };

  const selectionSort = async arr => {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
      const num = await getNum(i);
      setCurrentIndex(i);
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[min] > arr[j]) {
          min = j;
        }
      }
      if (i !== min) {
        [arr[i], arr[min]] = [arr[min], arr[i]];
      }
    }
    return arr;
  };

  const insertionSort = async arr => {
    let len = arr.length,
      value,
      i,
      j;
    for (i = 1; i < len + 1; i++) {
      const num = await getNum(i);
      setCurrentIndex(i);
      value = arr[i];
      j = i - 1;
      while (j >= 0 && arr[j] > value) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = value;
    }
    return arr;
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1rem"
      }}
    >
      <div></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Flipper flipKey={randomArray.join("")}>
          <div
            style={{
              display: "flex",
              width: "90vw",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {randomArray.map((item, i) => (
              <Flipped key={`item-${randNum()}`} flipId={item}>
                <div
                  style={{
                    width: `${300 / randomArray.length}px`,
                    height: `${item * 10}px`,
                    margin: "1px",
                    borderRadius: "30px",
                    backgroundColor:
                      i === currentIndex ? "red" : "rgba(44,44,255,0.7)"
                  }}
                ></div>
              </Flipped>
            ))}
          </div>
        </Flipper>
      </div>
      <div
        style={{
          border: "1px dotted white",
          backgroundColor: "rgba(255,255,255,0.077)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifySelf: "flex-end",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          Number:
          <input
            style={{ margin: "10px", width: "3rem", fontSize: "1.1rem" }}
            type="number"
            name="numberOfBars"
            id="numberOfBars"
            value={numberOfBars}
            min="2"
            max="100"
            onChange={e => setNumberOfBars(e.target.value)}
          />
          Speed: &nbsp;
          <select
            style={{ fontFamily: "Megrim", fontSize: "1rem" }}
            value={speedName}
            onChange={handleSpeed}
          >
            <option value="slowest">Slowest</option>
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
            <option value="fastest">Fastest</option>
          </select>
          <button style={{ margin: "10px" }} onClick={() => randomise()}>
            Randomise
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <button
            style={{ margin: "10px" }}
            onClick={() => bubbleSort(randomArray)}
          >
            Bubble Sort
          </button>
          <button
            style={{ margin: "10px" }}
            onClick={() => selectionSort(randomArray)}
          >
            Selection Sort
          </button>
          <button
            style={{ margin: "10px" }}
            onClick={() => insertionSort(randomArray)}
          >
            Insertion Sort
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
