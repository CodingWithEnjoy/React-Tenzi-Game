import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

export default function App() {
  const [start, setStart] = React.useState(false);

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);
  const [best, setBest] = React.useState(
    JSON.parse(localStorage.getItem("best")) || 0
  );
  const [bestTime, setBestTime] = React.useState(
    JSON.parse(localStorage.getItem("time")) || 0
  );

  const [startTime, setStartTime] = React.useState(null);
  const [now, setNow] = React.useState(null);

  const intervalRef = React.useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
    if (secondsPassed < bestTime || bestTime == 0) {
      localStorage.setItem("time", secondsPassed);
      setBestTime(secondsPassed);
    }
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      handleStop();
      if (rolls < best || best === 0) {
        localStorage.setItem("best", rolls);
        setBest(rolls);
      }
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (start) {
      if (!tenzies) {
        setDice((oldDice) =>
          oldDice.map((die) => {
            return die.isHeld ? die : generateNewDie();
          })
        );
        setRolls(rolls + 1);
      } else {
        handleStart();
        setRolls(0);
        setTenzies(false);
        setDice(allNewDice());
      }
    } else {
      setRolls(1);
      setStart(true);
      handleStart();
    }
  }

  function holdDice(id) {
    if (start) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        })
      );
    }
  }

  const diceElements = dice.map((die) => (
    <Die {...die} started={start} holdDice={() => holdDice(die.id)} />
  ));

  return (
    <div>
      <div className="timer">{secondsPassed.toFixed(2)}s</div>
      <main>
        {tenzies && <Confetti />}
        {bestTime !== 0 && (
          <div className="bestTime">
            <span className="best--name">Best Time:</span>
            <span className="best--time">{bestTime}s</span>
          </div>
        )}
        <h1 className="title">TENZI !</h1>
        <p className="instructions">
          Roll until all dice are the same.
          <br />
          Click each die to freeze it at its current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {!start ? "Start Game" : tenzies ? "New Game" : "Roll"}
        </button>
        <div className="scoreboard">
          <div className="scores">
            Rolls: <span>{rolls}</span>
          </div>
          {best !== 0 && (
            <div className="scores left">
              Best: <span>{best}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
