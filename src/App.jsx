import React from "react";
import Die from "./Die";
import { nanoid } from "../nanoid/index.browser";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function generateNewDie(){
    return {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(
        generateNewDie()
      )
    }
    return newDice;
  }

  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
        return (
            die.isHeld ? die : generateNewDie()
        )
    }));
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }
  const diceElement = dice.map((items) => (
    <Die 
    key={items.id} 
    value={items.value} 
    isHeld={items.isHeld}
    holdDice={() => holdDice(items.id)}
    />
  ))


  return (
    <main>
      <div className="dice-container">{diceElement}</div>
      <button className="roll" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
