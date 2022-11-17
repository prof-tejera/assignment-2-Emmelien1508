// import  { useState } from "react"

import Countdown from '../../organisms/countdown/Countdown'
import Stopwatch from '../../organisms/stopwatch/Stopwatch'
import Tabata from '../../organisms/tabata/Tabata'
import XY from '../../organisms/xy/XY'

export default function WorkoutItem(props) {
    // const [finished, setFinished] = useState(false)
    // const [running, setRunning] = useState(false)
    // const [configure, setConfigure] = useState(true)


    if (props.name === 'stopwatch') {
        return (
            <Stopwatch 
                disableSettingUp={props.disableSettingUp}
                isActive={true}
                isPaused={false}
                isReady={true}
                name={props.name}
                initialMinutes={props.initialMinutes}
                initialSeconds={props.initialSeconds}
                saveTimerInformation={props.saveTimerInformation}
                settingUp={props.settingUp} 
            />
        )
    } else if (props.name === 'countdown') {
        return (
            <Countdown 
                disableSettingUp={props.disableSettingUp} 
                isActive={true}
                isPaused={false}
                isReady={true}
                name={props.name}
                initialMinutes={props.initialMinutes}
                initialSeconds={props.initialSeconds}
                saveTimerInformation={props.saveTimerInformation}
                settingUp={props.settingUp} 
            />
        )
    } else if (props.name === 'xy') {
        return (
            <XY 
                disableSettingUp={props.disableSettingUp} 
                isActive={true}
                isPaused={false}
                isReady={true}
                name={props.name}
                initialMinutes={props.initialMinutes}
                initialSeconds={props.initialSeconds}
                rounds={props.rounds}
                saveTimerInformation={props.saveTimerInformation}
                settingUp={props.settingUp} 
            />
        )
    } else {
        return (
            <Tabata 
                disableSettingUp={props.disableSettingUp} 
                isActive={true}
                isPaused={false}
                isReady={true}
                name={props.name}
                initialMinutes={props.initialMinutes}
                initialSeconds={props.initialSeconds}
                initialRestMinutes={props.initialRestMinutes}
                initialRestSeconds={props.initialRestSeconds}
                rounds={props.rounds}
                saveTimerInformation={props.saveTimerInformation}
                settingUp={props.settingUp} 
            />
        )
    }
}