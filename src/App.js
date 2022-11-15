import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Countdown from './components/structures/countdown/Countdown'
import Documentation from './components/organisms/documentation/Documentation'
import Navigation from './components/structures/navigation/Navigation'
import Stopwatch from './components/structures/stopwatch/Stopwatch'
import Tabata from './components/structures/tabata/Tabata'
import XY from './components/structures/xy/XY'


export default function App() {
    return (
        <div className='container'>
            <Router>
                <Navigation />
                <Routes>
                    <Route path='/' element={<Documentation />} />
                    <Route path='/countdown' element={<Countdown />} />
                    <Route path='/stopwatch' element={<Stopwatch />} />
                    <Route path='/tabata' element={<Tabata />} />
                    <Route path='/xy' element={<XY />} />
                </Routes>
            </Router>
        </div>
    )
}
