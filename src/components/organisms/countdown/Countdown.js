import Timer from '../timer/Timer'
import './Countdown.css'


export default function Countdown(props) {
    return (
        <Timer 
            countdown={true}
            disableSettingUp={props.disableSettingUp}
            initialMinutes={props.initialMinutes}
            initialSeconds={props.initialSeconds}
            name={props.name}
            saveTimerInformation={props.saveTimerInformation}
            setFinished={props.setFinished}
            settingUp={props.settingUp}
        />
    )
}