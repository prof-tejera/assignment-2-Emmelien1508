import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Countdown from './components/organisms/countdown/Countdown'
import Documentation from './components/organisms/documentation/Documentation'
import Stopwatch from './components/organisms/stopwatch/Stopwatch'
import Tabata from './components/organisms/tabata/Tabata'
import XY from './components/organisms/xy/XY'

import Navigation from './components/structures/navigation/Navigation'
import Workout from './components/structures/workout/Workout'


export default function App() {
    return (
        <div className='container'>
            <Router>
                <Navigation />
                <Routes>
                    <Route path='/' element={<Workout />} />
                    <Route path='/docs' element={<Documentation/>} />
                    <Route path='/countdown' element={
                        <Countdown 
                            configure={false} 
                            initialMinutes={1}
                            initialSeconds={0}
                            isActive={false}
                            isPaused={true}
                            isReady={false}
                        />
                    } />
                    <Route path='/stopwatch' element={
                        <Stopwatch 
                            configure={false} 
                            initialMinutes={1}
                            initialSeconds={0}
                            isActive={false}
                            isPaused={true}
                            isReady={false}
                        />
                    } />
                    <Route path='/tabata' element={
                        <Tabata 
                            configure={false} 
                            initialMinutes={1}
                            initialSeconds={0}
                            isActive={false}
                            isPaused={true}
                            isReady={false}
                            rounds={3}
                        />
                    } />
                    <Route path='/xy' element={
                        <XY 
                            configure={false} 
                            initialMinutes={0}
                            initialRestMinutes={0}
                            initialRestSeconds={10}
                            initialSeconds={30}
                            isActive={false}
                            isPaused={true}
                            isReady={false}
                            rounds={3}
                        />
                    } />
                </Routes>
            </Router>
        </div>
    )
}
