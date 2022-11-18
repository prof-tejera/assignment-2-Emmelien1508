import { useNavigate, Link } from "react-router-dom"
import { useContext, useEffect, useRef } from "react"
import { TimerContext } from "../../../context/TimerContext"
import { workoutIsDone, calculateWorkoutTime, getTotalFastForwardTime } from "../../../utils/helpers"
import Button from "../../atoms/button/Button"
import TimePanel from "../../molecules/time-panel/TimePanel"

import './Workout.css'

export default function Workout() {
    const navigate = useNavigate()

    const {
        count,
        setCount,
        round,
        setRound,
        interval,
        setInterv,
        isPaused,
        setPaused,
        isStopped,
        setStopped,
        activeTimerIndex,
        setActiveTimerIndex,
        timers,
        setTimers,
        remainingTime,
        setRemainingTime,
    } = useContext(TimerContext)

    const workoutRunningTime = useRef(0)

    useEffect(() => {
        if (isStopped) {
            workoutRunningTime.current = calculateWorkoutTime(timers)
            setRemainingTime(workoutRunningTime.current)
        }
    }, [timers, isStopped])

    const removeTimer = (index) => {
        const newTimers = timers.filter((timer, i) => i !== index)
        setTimers(newTimers)
    }

    const workoutIsFinished = workoutIsDone(timers)
    const pauseLabel = isPaused ? "Resume" : "Pause"

    function handleStart() {
        const newTimers = timers.map((timer, i) => {
            return { ...timer, isRunning: false, isCompleted: false }
        })
        setTimers(newTimers)
        console.log("these are the new timers")
        console.log(newTimers)
        setCount(timers[0].startVal)

        if (timers[0].title === "XY" || timers[0].title === "Tabata") {
            setRound(timers[0].roundStartVal)
        }
        if (timers[0].title === "Tabata") {
            setInterv(timers[0].intervalStartVal)
        }

        setActiveTimerIndex(0)
        setStopped(false)
        setPaused(false)
    }

    function handlePause() {
        setPaused(!isPaused)
    }

    function handleReset() {
        const newTimers = timers.map((timer, i) => {
            return { ...timer, isRunning: false, isCompleted: false }
            })
        setTimers(newTimers)
        setStopped(true)
        // fix a race condition by setting index out of range
        setActiveTimerIndex(999)
    }

    function handleFastForward() {
        if (!isStopped) {
            setCount(timers[activeTimerIndex].endVal)

            if (
                timers[activeTimerIndex].title === "XY" ||
                timers[activeTimerIndex].title === "Tabata"
            ) {
                setRound(timers[activeTimerIndex].roundEndVal)
            }
            if (timers[activeTimerIndex].title === "Tabata") {
                setInterv(timers[activeTimerIndex].intervalEndVal)
            }

            setRemainingTime(
                workoutRunningTime.current -
                getTotalFastForwardTime(timers, activeTimerIndex)
            )
        }
    }

    return (
        <div className="workout">
            {timers.length > 0 && (
                <div className="main-wrap">
                    <div className="workout-buttons">
                        {isStopped && <Button classes="start" onClick={() => handleStart()}>Start</Button>}
                        {!isStopped && <Button classes="pause" onClick={() => handlePause()}>{pauseLabel}</Button>}
                        <Button classes="start" disabled={isStopped} onClick={() => handleReset()}>Reset</Button>
                        <Button classes="start" disabled={isStopped} onClick={() => handleFastForward()}>Fast Forward</Button>
                    </div>
                </div>
            )}
            <Button onClick={() => navigate("/docs")} label="Documentation" />
            {timers.length > 0 && isStopped && <Button classes="start" onClick={() => navigate("/add")}>Add timer</Button>}
            {timers.length > 0 && isStopped && !workoutIsFinished && (
                <span className="time-total">
                    <h2>Total time</h2>
                    <TimePanel time={calculateWorkoutTime(timers)} />
                </span>
            )}
            {timers.length > 0 && (!isStopped || workoutIsFinished) && (
                <span className="time-remaining">
                    <h2>Time remaining</h2>
                    <TimePanel time={workoutIsFinished ? 0 : remainingTime}/>
                </span>
            )}
            <div>
                {timers.length === 0 && (
                    <div className="empty-state">
                        <h2>No workout configured</h2>
                        <p>Please <Link to="/add">add one or more timers</Link> to get started</p>
                    </div>
                )}
                {timers.map((timerData, index) => (
                    <div className={"timer-wrapper " + (index === activeTimerIndex && (!isStopped || workoutIsFinished) ? "active" : "")} key={`wrap-${timerData.title}-${index}`}>
                        {isStopped && <Button classes="pause" key={`delete-${timerData.title}-${index}`} onClick={() => removeTimer(index)}>X</Button>}
                        <div className="timer" key={`timer-${timerData.title}-${index}`}>
                            <h2>{timerData.title}</h2>
                            <timerData.component {...timerData} isRunning={index === activeTimerIndex} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}