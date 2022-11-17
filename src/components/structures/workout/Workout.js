import { useEffect, useState } from 'react'

import Button from '../../atoms/button/Button'
import WorkoutItem from '../../organisms/workout-item/WorkoutItem'

import { capitalize } from '../../../utils/helpers'

import './Workout.css'


export default function Workout() {
    const [componentToAdd, setComponentToAdd] = useState(null)
    const [playWorkout, setPlayWorkout] = useState(false)
    const [queue, setQueue] = useState([])
    const [workoutList, setWorkoutList] = useState([])
    const [settingUp, setSettingUp] = useState(true)
    const [showOptions, setShowOptions] = useState(false)
    const [showStartButton, setShowStartButton] = useState(false)
    
    let workoutItems = [
        {
            name: 'stopwatch',
            component: <WorkoutItem 
                name="stopwatch"
                disableSettingUp={disableSettingUp}
                initialMinutes={1}
                initialSeconds={0}
                saveTimerInformation={saveTimerInformation}
                settingUp={settingUp}
            />,
        },
        {
            name: 'countdown',
            component: <WorkoutItem 
                name="countdown"
                disableSettingUp={disableSettingUp}
                initialMinutes={1}
                initialSeconds={0}
                saveTimerInformation={saveTimerInformation}
                settingUp={settingUp}
            />,
        },
        {
            name: 'xy',
            component: <WorkoutItem 
                name="xy"
                disableSettingUp={disableSettingUp}
                initialMinutes={1}
                initialSeconds={0}
                rounds={3}
                saveTimerInformation={saveTimerInformation}
                settingUp={settingUp}
            />,
        },
        {
            name: 'tabata',
            component: <WorkoutItem 
                name="tabata"
                disableSettingUp={disableSettingUp}
                initialMinutes={0}
                initialRestMinutes={0}
                initialRestSeconds={10}
                initialSeconds={30}
                rounds={3}
                saveTimerInformation={saveTimerInformation}
                settingUp={settingUp}
            />,
        },
    ]

    function saveTimerInformation(data){
        const workout = workoutItems.find(element => element.name = data.name)
        for (const [key, value] of Object.entries(data)) {
            workout[key] = value
        }

        if (data.name === 'stopwatch') {
            workout['information'] = <p>Count up to {workout.formattedMinutes}m {workout.formattedSeconds}s</p>
        } else if (data.name === 'countdown') {
            workout['information'] = <p>Count down from {workout.formattedMinutes}m {workout.formattedSeconds}s</p>
        } else if (data.name === 'xy') {
            workout['information'] = (
                <div>
                    <p>Count up to {workout.formattedMinutes}m {workout.formattedSeconds}s</p>
                    <p>For {workout.rounds} rounds</p>
                </div>
            )
        } else {
            workout['information'] = (
                <div>
                    <p>Work {workout.formattedMinutes}m {workout.formattedSeconds}s & Rest {workout.formattedRestMinutes}m {workout.formattedRestSeconds}s</p>
                    <p>For {workout.rounds} rounds</p>
                </div>
            )
        }
        // save information to this workout item
        setQueue((queue) => [...queue, workout])
    }

    function disableSettingUp() {
        setSettingUp(false)
    }

    function showWorkoutOptions() {
        setShowOptions(!showOptions)
    }

    function addWorkout(workout) {
        // first configure the time and rounds etc.
        setSettingUp(true)
        setComponentToAdd(workout.component)
    }

    function handleWorkoutStart() {
        setPlayWorkout(true)
        setSettingUp(false)
        for (let item of queue) {
            let thing
            if (item.restMinutes !== null) {
                thing = (
                    <WorkoutItem 
                        initialMinutes={item.minutes}
                        initialRestMinutes={item.restMinutes}
                        initialRestSeconds={item.restSeconds}
                        initialSeconds={item.seconds}
                        name={item.name} 
                        rounds={item.rounds}
                    />
                )
            } else if (item.rounds !== null) {
                thing = (
                    <WorkoutItem 
                        initialMinutes={item.minutes}
                        initialSeconds={item.seconds}
                        name={item.name} 
                        rounds={item.rounds}
                    />
                )
            } else {
                thing = (
                    <WorkoutItem 
                        initialMinutes={item.minutes}
                        initialSeconds={item.seconds}
                        name={item.name} 
                    />
                )
            }
            setWorkoutList((workoutList) => [...workoutList, thing])
        }
    }

    useEffect(() => {
        console.log(workoutList)
        for (let w of workoutList) {
            // somehow the activeness is not coming through
            console.log(w)
            console.log(w.props)
        }
    }, [workoutList])

    useEffect(() => {
        if (queue.length > 0) {
            setShowStartButton(true)
        }
    }, [queue])

    const workoutOptions = (
        <div className='workout-options'>
            {
                workoutItems.map((workout, index) => {
                    return (
                        <p key={index} onClick={() => addWorkout(workout)} >
                            {capitalize(workout.name)}
                        </p>
                    )
                })
            }
        </div>
    )

    const displayComponent = componentToAdd
    const displayGrid = (
        <div>
            {showStartButton ? <Button classes="start" onClick={handleWorkoutStart} >Start</Button> : <></>}
            <div className='workout-grid'>
                {queue.map((workout, index) => (
                    <div className="workout-item" key={index}>
                        <h2>{capitalize(workout.name)}</h2>
                        {workout.information}
                    </div>
                ))}
            </div>
        </div>
    )

    const playTimers = (
        <div>
            {workoutList.map((workout, index) => (
                <div className="workout-item" key={index}>
                    {workout}
                </div>
            ))}
        </div>
    )

    let workout
    const options = showOptions ? workoutOptions : <></>
    const add = playWorkout ? <></> : (
        <div>
            <div className='add-workout' onClick={showWorkoutOptions}>
                <div className='add-workout-button'>
                    <p>+</p>
                </div>
                <h3>Add</h3>
            </div>
            {options}
        </div>
    )

    if (playWorkout) {
        workout = playTimers 
    } else {
        workout = settingUp ? displayComponent : displayGrid
    }

    return (
        <div className='workout'>
            <div className='workout-instructions'>
                <h2>Choose your workout</h2>
                <div>
                    <p>Add your first workout!</p>
                    <p>Here, you can select your workout plan</p>
                </div>
                {add}
            </div>
            <div className='workout-placeholder'>
                {workout}
            </div>
        </div>
    )
}