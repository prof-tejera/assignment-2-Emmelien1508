import Button from '../../atoms/button/Button'

import './TimeChooser.css'


export default function TimeChooser(props) {
    const titleClass = props.disabled ? "time-chooser-title disabled" : "time-chooser-title"
    const valClass = props.disabled ? "time-chooser-value disabled" : "time-chooser-value"

    return (
        <div className="timer-chooser-buttons">
            <div>
                <p className={titleClass}>{props.minutesLabel}:</p>
                <div className="time-chooser">
                    <Button classes="start extra-small" disabled={props.disabled} onClick={() => props.setMinutes(props.minutes - 1)}>-</Button>
                    <span className={valClass}>{props.minutes}</span>
                    <Button classes="start extra-small" disabled={props.disabled} onClick={() => props.setMinutes(props.minutes + 1)}>+</Button>
                </div>
            </div>
            
            <div>
                <p className={titleClass}>{props.secondsLabel}:</p>
                <div className="time-chooser">
                    <Button classes="start extra-small" disabled={props.disabled} onClick={() => props.setSeconds(props.seconds - 1)}>-</Button>
                    <span className={valClass}>{props.seconds}</span>
                    <Button classes="start extra-small" disabled={props.disabled} onClick={() => props.setSeconds(props.seconds + 1)}>+</Button>
                </div>
            </div>
        </div>
    )
}