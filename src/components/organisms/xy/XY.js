import Timer from '../timer/Timer'
import './XY.css'

export default function XY(props) {
    return (
        <Timer 
            countdown={true}
            disableSettingUp={props.disableSettingUp}
            hasRounds={true}
            initialMinutes={props.initialMinutes}
            initialSeconds={props.initialSeconds}
            rounds={props.rounds}
            name={props.name}
            saveTimerInformation={props.saveTimerInformation}
            setFinished={props.setFinished}
            settingUp={props.settingUp}
        />
    )
}