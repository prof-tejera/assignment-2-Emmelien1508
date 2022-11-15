import { useEffect, useState } from 'react'

import Countdown from '../../organisms/countdown/Countdown'
import Stopwatch from '../../organisms/stopwatch/Stopwatch'
import Tabata from '../../organisms/tabata/Tabata'
import XY from '../../organisms/xy/XY'

import './Workout.css'


export default function Workout() {
    const [queue, setQueue] = useState([])
    const [chooserOpen, setChooserOpen] = useState(false)

    function addWorkout(e) {
        console.log("button clicked")
    }

    return (
        <div className='workout'>
            <div className='workout-instructions'>
                <p>Add your first workout!</p>
                <p>Here, you can select your workout plan</p>
            </div>
            <div className='workout-placeholder'>
                <div className='add-workout' onClick={addWorkout}>
                    <p>+</p>
                </div>
                <div className='workout-chooser'>
                    Choose your workout!!!
                </div>
            </div>
        </div>
    )
}