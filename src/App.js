import DiceContainer from "./DiceContainer";
import {nanoid} from "nanoid";
import React from "react";

export default function App() {

    function RollDice() {
        return Array.from({length: 10}, () => {
            return {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }
        })
    }

    function ReRollDice(prevDice) {
        return prevDice.map(prevDie => {
            return {
                ...prevDie,
                value: prevDie.isHeld ? prevDie.value : Math.ceil(Math.random() * 6)
            }
        })
    }

    const [dice, setDice] = React.useState(RollDice())

    function handleDiceClick(event) {
        setDice(dice => {
            return dice.map(die => {
                if (die.id === event.target.id)
                    die.isHeld = !die.isHeld
                return die
            })
        })
    }

    function handleRollButtonClick() {
        setDice(dice => ReRollDice(dice))
    }

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="text">
                Roll until all dice are the same.
                Click each die to freeze it at its current
                value between rolls.
            </p>
            <DiceContainer
                dice={dice}
                onClick={handleDiceClick}
            />
            <button
                className="roll-button"
                onClick={handleRollButtonClick}
            >
                Roll
            </button>
        </main>
    )
}
