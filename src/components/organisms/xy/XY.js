import Timer from '../timer/Timer'
import './XY.css'

export default function XY(props) {
    return (
        <Timer 
            countdown={true}
            hasRounds={true}
            initialMinutes={0}
            initialSeconds={3}
        />
    )
}