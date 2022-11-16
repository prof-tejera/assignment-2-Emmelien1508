import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Countdown from './components/organisms/countdown/Countdown'
import Documentation from './components/organisms/documentation/Documentation'
import Stopwatch from './components/organisms/stopwatch/Stopwatch'
import Tabata from './components/organisms/tabata/Tabata'
import XY from './components/organisms/xy/XY'

import Navigation from './components/structures/navigation/Navigation'
import Workout from './components/structures/workout/Workout'


export default function App() {
    const [queue, setQueue] = useState([])
    const [configure, setConfigure] = useState(false)
    const [componentToAdd, setComponentToAdd] = useState(null)
    const [showOptions, setShowOptions] = useState(false)

    function showWorkoutOptions() {
        setShowOptions(!showOptions)
    }

    function addWorkout(workout) {
        // first configure the time and rounds etc.
        setConfigure(true)
        setComponentToAdd(workout.component)
        setQueue((queue) => [...queue, workout.name])
    }

    return (
        <div className='container'>
            <Router>
                <Navigation />
                <Routes>
                    <Route path='/' element={
                        <Workout 
                            addWorkout={addWorkout} 
                            componentToAdd={componentToAdd}
                            configure={configure}
                            queue={queue} 
                            setConfigure={setConfigure} 
                            setQueue={setQueue}
                            showOptions={showOptions}
                            showWorkoutOptions={showWorkoutOptions}
                        />
                    } />
                    <Route path='/docs' element={<Documentation/>} />
                    <Route path='/countdown' element={<Countdown/>} />
                    <Route path='/stopwatch' element={<Stopwatch/>} />
                    <Route path='/tabata' element={<Tabata/>} />
                    <Route path='/xy' element={<XY/>} />
                </Routes>
            </Router>
        </div>
    )
}
