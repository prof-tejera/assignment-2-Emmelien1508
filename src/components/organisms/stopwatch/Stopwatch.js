
import Timer from '../timer/Timer'
import './Stopwatch.css'

export default function Stopwatch() {
    return (
        <Timer 
            countdown={false}
            initialMinutes={1}
            initialSeconds={0}
        />
    )
}
