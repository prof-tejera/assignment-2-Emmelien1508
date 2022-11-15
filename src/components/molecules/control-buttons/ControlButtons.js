import Button from "../../atoms/button/Button"

import './ControlButtons.css'


export default function ControlButtons(props) {
    if (props.type === 'stopwatch') {
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
    } else {
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

        const nonActiveButtons = (
            <div>
                <Button classes="reset" onClick={props.handleClear}>
                    Clear
                </Button>
                <Button classes="start" onClick={props.handleStart}>
                    Start
                </Button> 
            </div>
        )
    
        const initialButtons = (
            <div>
                <Button classes="reset" onClick={props.handleClear}>
                    Clear
                </Button>
                <Button classes="start" onClick={props.handleSet}>
                    Set
                </Button>
            </div>
        )

        const readyButtons = props.active ? activeButtons : nonActiveButtons

        return (
            <div className="control-buttons">
                {props.ready ? readyButtons : initialButtons}
            </div>
        )
    }
}