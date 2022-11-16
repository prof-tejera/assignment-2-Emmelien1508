
import './WorkoutSection.css'

export default function WorkoutSection({queue, setQueue}) {
    return (
        <div className='workout-grid'>
            {queue.map((item, index) => (
                <div className="workout-item" key={index}>{item}</div>
            ))}
        </div>
    )
}