import React from "react"
import Die from "./Die";

export default function DiceContainer({dice, onClick}) {

    const diceElement = dice.map(die => (
        <Die
            key={die.id}
            id={die.id}
            value={die.value}
            onClick={onClick}
            isHeld={die.isHeld}
        />
    ))

    return (
        <div className="dice-container">
            {diceElement}
        </div>
    )
}
