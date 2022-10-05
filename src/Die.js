import {nanoid} from "nanoid";

export default function Die({id, value, onClick, isHeld}) {

    const className = isHeld ? "die green" : "die"

    const dots = Array.from({length: value}, () =>
        <div className={`dot dot-${value}`} key={nanoid()}></div>
    )

    return (
        <div
            className={className}
            onClick={onClick}
            id={id}
        >
            {dots}
        </div>
    )
}
