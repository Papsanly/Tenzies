export default function Die({id, value, onClick, isHeld}) {

    const className = isHeld ? "die green" : "die"

    return (
        <div className={className}
             onClick={onClick}
             id={id}>
            {value}
        </div>
    )
}