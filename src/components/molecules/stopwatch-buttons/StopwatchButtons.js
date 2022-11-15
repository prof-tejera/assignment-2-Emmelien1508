import Button from "../../atoms/button/Button"

import './StopwatchButtons.css'


export default function StopwatchButtons(props) {
    const activeButtons = (
        <div>
            <Button classes="reset" onClick={props.handleReset}>
                Reset
            </Button>
            <Button classes={props.paused ? "resume" : "pause"} onClick={props.handlePauseResume}>
                {props.paused ? "Resume" : "Pause"}
            </Button> 
        </div>
    )

    const startButton = (
        <div>
            <Button classes="reset" onClick={props.handleReset}>
                Reset
            </Button>
            <Button classes="start" onClick={props.handleStart}>
                Start
            </Button>
        </div>
    )
    
    return (
        <div className="control-buttons">
            {props.active ? activeButtons : startButton}
        </div>
    )
}