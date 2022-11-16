import Timer from '../timer/Timer'

import './Tabata.css'


export default function Tabata(props) {
    return (
        <Timer 
            countdown={true}
            hasRest={true}
            hasRounds={true}
            initialMinutes={0}
            initialRestMinutes={0}
            initialRestSeconds={3}
            initialSeconds={6}
        />
    )
}