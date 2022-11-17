import Timer from '../timer/Timer'

import './Tabata.css'


export default function Tabata(props) {
    return (
        <Timer 
            countdown={true}
            disableSettingUp={props.disableSettingUp}
            hasRest={true}
            hasRounds={true}
            initialMinutes={props.initialMinutes}
            initialRestMinutes={props.initialRestMinutes}
            initialRestSeconds={props.initialRestSeconds}
            initialSeconds={props.initialSeconds}
            name={props.name}
            rounds={props.rounds}
            saveTimerInformation={props.saveTimerInformation}
            setFinished={props.setFinished}
            settingUp={props.settingUp}
        />
    )
}