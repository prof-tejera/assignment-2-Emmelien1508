import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Countdown from './components/organisms/countdown/Countdown'
import Documentation from './components/organisms/documentation/Documentation'
import Navigation from './components/structures/navigation/Navigation'
import Stopwatch from './components/organisms/stopwatch/Stopwatch'
import Tabata from './components/organisms/tabata/Tabata'
import XY from './components/organisms/xy/XY'


export default function App() {
    return (
        <div className='container'>
            <Router>
                <Navigation />
                <Routes>
                    <Route path='/assignment-2-Emmelien1508/' element={<Documentation />} />
                    <Route path='/assignment-2-Emmelien1508/countdown' element={<Countdown />} />
                    <Route path='/assignment-2-Emmelien1508/stopwatch' element={<Stopwatch />} />
                    <Route path='/assignment-2-Emmelien1508/tabata' element={<Tabata />} />
                    <Route path='/assignment-2-Emmelien1508/xy' element={<XY />} />
                </Routes>
            </Router>
        </div>
    )
}
