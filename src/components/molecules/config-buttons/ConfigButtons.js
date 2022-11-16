import Button from "../../atoms/button/Button"

import './ConfigButtons.css'


export default function ConfigButtons(props) {
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

    return (
        <div className="control-buttons">
            {props.ready ? <></> : initialButtons}
        </div>
    )
}