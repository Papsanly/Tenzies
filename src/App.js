import DiceContainer from "./DiceContainer";
import {nanoid} from "nanoid";
import React from "react";
import ReactConfetti from "react-confetti";

export default function App() {

    function EmptyDice() {
        return Array.from({length: 10}, () => {
            return {
                value: 0,
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

    const [dice, setDice] = React.useState(EmptyDice())
    const [isGameWon, setIsGameWon] = React.useState(false)
    const [isGameStarted, setIsGameStarted] = React.useState(false)
    const [rollsCount, setRollsCount] = React.useState(0)
    const [time, setTime] = React.useState(0)

    React.useEffect(() => {
        if (
            dice.every(die => die.value === dice[0].value) &&
            dice.every(die => die.isHeld)
        ) {
            console.log("You win!")
            setIsGameWon(true)
        }
    }, [dice])

    React.useEffect(() => {
        let interval
        if (!isGameWon && isGameStarted)
            interval = setInterval(() => setTime(time =>
                Math.round(time + 1)), 100
            )
        if (!isGameStarted)
            setDice(EmptyDice())
        return () => {
            if (!isGameWon)
                clearInterval(interval)
        }
    }, [isGameWon, isGameStarted])

    function handleDiceClick(event) {
        if (!isGameWon && isGameStarted)
            setDice(dice => {
                return dice.map(die => {
                    if (die.id === event.target.id)
                        die.isHeld = !die.isHeld
                    return die
                })
            })
    }

    function handleRollButtonClick() {
        if (!isGameStarted) {
            setIsGameStarted(true)
        }
        if (isGameWon) {
            setIsGameWon(false)
            setTime(0)
            setRollsCount(0)
            setIsGameStarted(false)
        }
        else {
            setDice(dice => ReRollDice(dice))
            setRollsCount(rollsCount => rollsCount + 1)
        }
    }

    const headerStyle = isGameWon ? "you-win-title" : "you-win-title transparent"
    const timeDisplay = `${Math.round(time / 10)}.${time % 10}s`
    let rollButtonText;
    if (isGameWon)
        rollButtonText = "Reset"
    else if (!isGameStarted)
        rollButtonText = "Start"
    else
        rollButtonText = "Roll"

    return (
        <div>
            {isGameWon && <ReactConfetti/>}
            <header className={headerStyle}>You Win!</header>
            <div className="stats-container">
                <h2 className="stats">Rolls: {rollsCount}</h2>
                <h2 className="stats">Time: {timeDisplay}</h2>
            </div>
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
                    {rollButtonText}
                </button>
            </main>
        </div>
    )
}
