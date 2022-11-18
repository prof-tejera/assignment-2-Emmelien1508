import Button from '../../atoms/button/Button'

import './RoundChooser.css'


export default function RoundChooser(props) {
    return (
        <div className='round-chooser-buttons'>
            <p>Rounds:</p>
            <div className="round-chooser">
                <Button classes="start extra-small" onClick={() => {props.setRounds(props.rounds - 1)}}>-</Button>
                <span className='round-chooser-value'>{props.rounds}</span>
                <Button classes="start extra-small" onClick={() => props.setRounds(props.rounds + 1)}>+</Button>
            </div>
        </div>
    )
}