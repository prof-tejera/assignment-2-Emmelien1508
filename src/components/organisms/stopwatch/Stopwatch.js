
import Timer from '../timer/Timer'
import './Stopwatch.css'

export default function Stopwatch(props) {
    return (
        <Timer 
            countdown={false}
            disableSettingUp={props.disableSettingUp}
            name={props.name}
            initialMinutes={props.initialMinutes}
            initialSeconds={props.initialSeconds}
            saveTimerInformation={props.saveTimerInformation}
            setFinished={props.setFinished}
            settingUp={props.settingUp}
        />
    )
}