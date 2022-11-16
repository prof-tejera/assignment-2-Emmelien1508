import Timer from '../timer/Timer'
import './Countdown.css'


export default function Countdown(props) {
    return (
        <Timer 
            countdown={true}
            initialMinutes={1}
            initialSeconds={0}
        />
    )
}