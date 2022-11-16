import Countdown from '../../organisms/countdown/Countdown'
import Stopwatch from '../../organisms/stopwatch/Stopwatch'
import Tabata from '../../organisms/tabata/Tabata'
import WorkoutSection from '../../organisms/workout-section/WorkoutSection'
import XY from '../../organisms/xy/XY'

import { capitalize } from '../../../utils/helpers'

import './Workout.css'


export default function Workout({addWorkout, configure, setConfigure, queue, setQueue, showWorkoutOptions, componentToAdd, showOptions}) {
    const workouts = [
        { name: 'stopwatch', component: <Stopwatch config={configure} setConfigure={setConfigure} /> },
        { name: 'countdown', component: <Countdown config={configure} setConfigure={setConfigure} /> },
        { name: 'xy', component: <XY config={configure} setConfigure={setConfigure} /> },
        { name: 'tabata', component: <Tabata config={configure} setConfigure={setConfigure} /> },
    ]

    const workoutOptions = (
        <div className='workout-options'>
            {
                workouts.map((workout, index) => {
                    return (
                        <p key={index} onClick={() => addWorkout({ name: workout.name, component: workout.component })} >
                            {capitalize(workout.name)}
                        </p>
                    )
                })
            }
        </div>
    )

    const displayComponent = componentToAdd
    const displayGrid = <WorkoutSection queue={queue} setQueue={setQueue}/>

    return (
        <div className='workout'>
            <div className='workout-instructions'>
                <h2>Choose your workout</h2>
                <div>
                    <p>Add your first workout!</p>
                    <p>Here, you can select your workout plan</p>
                </div>
                <div className='add-workout' onClick={showWorkoutOptions}>
                    <div className='add-workout-button'>
                        <p>+</p>
                    </div>
                    <h3>Add</h3>
                </div>
                {showOptions ? workoutOptions : <></>}
            </div>
            <div className='workout-placeholder'>
                {configure ? displayComponent : displayGrid }
            </div>
        </div>
    )
}