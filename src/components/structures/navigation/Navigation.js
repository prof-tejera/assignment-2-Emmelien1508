import { Link } from 'react-router-dom'

import './Navigation.css'


export default function Navigation() {
    return (
        <div>
            <ul className='navigation-menu'>
                <li><Link to='/assignment-2-Emmelien1508/stopwatch'>Stopwatch</Link></li>
                <li><Link to='/assignment-2-Emmelien1508/countdown'>Countdown</Link></li>
                <li><Link to='/assignment-2-Emmelien1508/xy'>XY</Link></li>
                <li><Link to='/assignment-2-Emmelien1508/tabata'>Tabata</Link></li>
            </ul>
        </div>
    )
}
