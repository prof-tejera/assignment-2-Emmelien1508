import { useEffect, useState } from 'react'

import ConfigButtons from '../../molecules/config-buttons/ConfigButtons'
import ControlButtons from '../../molecules/control-buttons/ControlButtons'
import RoundChooser from '../../molecules/round-chooser/RoundChooser'
import TimeChooser from '../../molecules/time-chooser/TimeChooser'
import TimePanel from '../../molecules/time-panel/TimePanel'

import './Timer.css'

export default function Timer(props) {
    const [isReady, setIsReady] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(true)

    const [currentRound, setCurrentRound] = useState(1)
    const [initialRounds, setInitialRounds] = useState(1)
    const [totalRounds, setTotalRounds] = useState(1)

    const [rest, setRest] = useState(false)
    const [work, setWork] = useState(true)

    const [minutes, setMinutes] = useState(props.initialMinutes)
    const [seconds, setSeconds] = useState(props.initialSeconds)
    const [time, setTime] = useState(props.initialMinutes * 60000 + props.initialSeconds * 1000)
    const [initialTime, setInitialTime] = useState(time)

    const [initialRestTime, setInitialRestTime] = useState(0)
    const [restMinutes, setRestMinutes] = useState(0)
    const [restSeconds, setRestSeconds] = useState(3)
    const [restTime, setRestTime] = useState(0)

    useEffect(() => {
        let interval;
        if (props.countdown) {
            interval = setInterval(countDown, 10);
        } else {
            interval = setInterval(countUp, 10);
        }
        return () => {
            clearInterval(interval)
        }
    })

    function countUp() {
        if (isActive && !isPaused) {
            if (time < initialTime) {
                setTime((time) => time + 10)
            } else {
                handleReset()
            }
        }
    }

    function countDown() {
        // this looks like a nightmare
        if (isActive && !isPaused) {
            if (props.hasRest) {
                if (work) {
                    if (time > 0) {
                        setTime((time) => time - 10)
                    } else {
                        setTime(initialTime)
                        setRest(true)
                        setWork(false)
                    }
                } else if (rest) {
                    if (restTime > 0) {
                        setRestTime((restTime) => restTime - 10)
                    } else {
                        resetCountDown()
                        setRest(false)
                        setWork(true)
                    }
                }
            } else {
                if (time > 0) {
                    setTime((time) => time - 10)
                } else {
                    resetCountDown()
                } 
            }
        }
    }

    function resetCountDown() {
        props.hasRounds ? handleRoundReset() : handleReset()
    }

    function handleRoundReset() {
        if (totalRounds === 1) {
            handleReset()
        } else {
            setTime(initialTime)
            setTotalRounds(totalRounds - 1)
            setCurrentRound(currentRound + 1)
        }
    }

    function handleClear() {
        props.countdown ? setTime(initialTime) : setTime(0)
        setMinutes(props.initialMinutes)
        setSeconds(props.initialSeconds)
        setIsReady(false)
    }
    
    function handleSet() {
        if (props.countdown) {
            setTime(minutes * 60000 + seconds * 1000)
            setInitialTime(minutes * 60000 + seconds * 1000)
        } else {
            setTime(0)
            setInitialTime(minutes * 60000 + seconds * 1000)
        }

        if (props.hasRounds) {
            setInitialRounds(totalRounds)
        }

        if (props.hasRest) {
            setRestTime(restMinutes * 60000 + restSeconds * 1000)
            setInitialRestTime(restMinutes * 60000 + restSeconds * 1000)
        }

        if (props.config) {
            props.setConfigure(false)
        }

        setIsReady(true)
    }

    function handleStart() {
        setIsActive(true)
        setIsPaused(false)
    }

    function handlePauseResume() {
        setIsPaused(!isPaused)
    }

    function handleReset() {
        if (props.hasRounds) {
            setCurrentRound(1)
        }

        props.countdown ? setTime(minutes * 60000 + seconds * 1000) : setTime(0)

        if (props.hasRest) {
            setRestTime(initialRestTime)
        }

        setIsActive(false)
        setIsPaused(true)
    }

    function incrementMinutes() {
        if (minutes < 60) {
            setMinutes(minutes + 1)
        }
    }

    function decrementMinutes() {
        if (minutes > 1) {
            setMinutes(minutes - 1)
        } else if (seconds > 0) {
            setMinutes(0)
        } else if (minutes === 1 && seconds === 0) {
            setMinutes(0)
            setSeconds(59)
        }
    }

    function incrementSeconds() {
        if (seconds === 59) {
            setMinutes(minutes + 1)
            setSeconds(0)
        } else {
            setSeconds(seconds + 1)
        }
    }

    function decrementSeconds() {
        if (seconds > 1) {
            setSeconds(seconds - 1)
        } else if (minutes > 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
        }
    }

    function incrementRestMinutes() {
        if (restMinutes < 60) {
            setRestMinutes(restMinutes + 1)
        }
    }

    function decrementRestMinutes() {
        if (restMinutes > 1) {
            setRestMinutes(restMinutes - 1)
        } else if (restSeconds > 0) {
            setRestMinutes(0)
        }
    }

    function incrementRestSeconds() {
        if (restSeconds === 59) {
            setRestMinutes(restMinutes + 1)
            setRestSeconds(0)
        } else {
            setRestSeconds(restSeconds + 1)
        }
    }

    function decrementRestSeconds() {
        if (restSeconds > 1) {
            setRestSeconds(restSeconds - 1)
        } else if (restMinutes > 0) {
            setRestSeconds(59)
            setRestMinutes(restMinutes - 1)
        }
    }

    function decrementRounds() {
        if (totalRounds > 1) {
            setTotalRounds(totalRounds - 1)
        }
    }

    function incrementRounds() {
        setTotalRounds(totalRounds + 1)
    }

    const initialMinutes = Math.floor((initialTime / 60000) % 60)
    const initialSeconds = Math.floor((initialTime / 1000) % 60)
    let message
    if (props.hasRounds) {
        message = <p>Round {currentRound} / {initialRounds}</p>
    } else if (props.countdown) {
        message = <p>Count down from {("0" + initialMinutes).slice(-2)}:{("0" + initialSeconds).slice(-2)}</p>
    } else {
        message = <p>Count up to {("0" + initialMinutes).slice(-2)}:{("0" + initialSeconds).slice(-2)}</p>
    }

    const panel = (
        <div className='time-panel-wrapper'>
            {message}
            {props.hasRest ? (
                <div className='time-panels'>
                    <div>
                        <p>Work <span className='text-md'>🏋🏼</span></p>
                        <TimePanel time={time} />
                    </div>
                    <div>
                        <p>Rest<span className='text-md'>🧘🏼</span></p>
                        <TimePanel time={restTime} />
                    </div>
                </div>
            ) : (
                <TimePanel time={time} />
            )}
        </div>
    )

    const chooser = (
        <div>
            {props.hasRounds ? (
                <RoundChooser 
                    totalRounds={totalRounds}
                    decrementRounds={decrementRounds}
                    incrementRounds={incrementRounds}
                />
            ) : (<></>)}

            {props.hasRest ? (
                <div className='time-choosers'>
                    <div>
                        <p>Work</p>
                        <TimeChooser 
                            minutes={minutes}
                            seconds={seconds}
                            incrementMinutes={incrementMinutes}
                            decrementMinutes={decrementMinutes}
                            incrementSeconds={incrementSeconds}
                            decrementSeconds={decrementSeconds}
                        /> 
                    </div>
                    <div>
                        <p>Rest</p>
                        <TimeChooser 
                            minutes={restMinutes}
                            seconds={restSeconds}
                            incrementMinutes={incrementRestMinutes}
                            decrementMinutes={decrementRestMinutes}
                            incrementSeconds={incrementRestSeconds}
                            decrementSeconds={decrementRestSeconds}
                        /> 
                    </div>
                </div>
            ) : (
                <TimeChooser 
                    minutes={minutes}
                    seconds={seconds}
                    incrementMinutes={incrementMinutes}
                    decrementMinutes={decrementMinutes}
                    incrementSeconds={incrementSeconds}
                    decrementSeconds={decrementSeconds}
                /> 
            )}
        </div>
    )

    const controlButtons = (
        <ControlButtons 
            paused={isPaused}
            active={isActive}
            ready={isReady}
            handleClear={handleClear}
            handlePauseResume={handlePauseResume}
            handleReset={handleReset}
            handleSet={handleSet}
            handleStart={handleStart}
        />
    )
    
    const configButtons = (
        <ConfigButtons 
            ready={isReady}
            handleClear={handleClear}
            handleSet={handleSet}
        />
    )

    return (
        <div className='timer-wrapper'>
            <div className='countdown'>
                {isReady ? panel : chooser}
                {props.config ? configButtons : controlButtons}
            </div>
        </div>
    )
}
