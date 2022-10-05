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
    const [isGameWon, setIsGameWon] = React.useState(false)

    React.useEffect(() => {
        if (
            dice.every(die => die.value === dice[0].value) &&
            dice.every(die => die.isHeld)
        ) {
            console.log("You win!")
            setIsGameWon(true)
        }
    }, [dice])

    function handleDiceClick(event) {
        if (!isGameWon)
            setDice(dice => {
                return dice.map(die => {
                    if (die.id === event.target.id)
                        die.isHeld = !die.isHeld
                    return die
                })
            })
    }

    function handleRollButtonClick() {
        if (isGameWon) {
            setDice(RollDice())
            setIsGameWon(false)
        }
        else
            setDice(dice => ReRollDice(dice))
    }

    const headerStyle = isGameWon ? "you-win-title" : "you-win-title transparent"

    return (
        <div>
            <header className={headerStyle}>You Win!</header>
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
                    {isGameWon ? "Reset dice" : "Roll"}
                </button>
            </main>
        </div>
    )
}
