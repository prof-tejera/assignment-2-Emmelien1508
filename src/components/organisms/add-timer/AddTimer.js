import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../atoms/button/Button";
import RoundChooser from "../../molecules/round-chooser/RoundChooser";
import TimeChooser from "../../molecules/time-chooser/TimeChooser";

import Countdown from '../countdown/Countdown'
import Stopwatch from '../stopwatch/Stopwatch'
import Tabata from '../tabata/Tabata'
import XY from '../xy/XY'

import { getMiliseconds } from "../../../utils/helpers";
import { TimerContext } from "../../../context/TimerContext";

import './AddTimer.css'

export default function AddTimer() {
    const navigate = useNavigate();
    const { timers, setTimers } = useContext(TimerContext);
  
    const [intervalMinutes, setIntervalMinutes] = useState(0);
    const [intervalSeconds, setIntervalSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [rounds, setRounds] = useState(1);
    const [seconds, setSeconds] = useState(0);
    const [type, setType] = useState("");
  
    const data = {
      minutesLabel: "Minutes",
      secondsLabel: "Seconds",
      minutes,
      seconds,
      setMinutes,
      setSeconds,
    }

    const intervalData = {
        minutesLabel: "Interval Minutes",
        secondsLabel: "Interval Seconds",
        minutes: intervalMinutes,
        seconds: intervalSeconds,
        setMinutes: setIntervalMinutes,
        setSeconds: setIntervalSeconds,
    }

    function addTimer() {
        let timerData = {
            title: "",
            component: "",
            startVal: "",
            endVal: "",
            roundStartVal: "",
            roundEndVal: "",
            intervalStartVal: "",
            intervalEndVal: "",
            isRunning: false,
            isCompleted: false,
        }
        timerData.title = type

        if (type === 'Stopwatch') {
            timerData.component = Stopwatch;
            timerData.startVal = 0;
            timerData.endVal = getMiliseconds(minutes, seconds);
            timerData.timerSecs = timerData.endVal;
        } else if (type === 'Countdown') {
            timerData.component = Countdown;
            timerData.startVal = getMiliseconds(minutes, seconds);
            timerData.endVal = 0;
            timerData.timerSecs = timerData.startVal;
        } else if (type === 'XY') {
            timerData.component = XY;
            timerData.startVal = getMiliseconds(minutes, seconds);
            timerData.endVal = 0;
            timerData.roundStartVal = rounds;
            timerData.roundEndVal = 1;
            timerData.timerSecs = timerData.startVal * timerData.roundStartVal;
        } else {
            timerData.component = Tabata;
            timerData.startVal = getMiliseconds(minutes, seconds);
            timerData.endVal = 0;
            timerData.intervalStartVal = getMiliseconds(intervalMinutes, intervalSeconds);
            timerData.intervalEndVal = 0;
            timerData.roundStartVal = rounds;
            timerData.roundEndVal = 1;
            timerData.timerSecs = (timerData.startVal + timerData.intervalStartVal) * timerData.roundStartVal;
        }

        const newTimer = [...timers, timerData];
        setTimers(newTimer);
    
        // reset values
        setType("")
        setIntervalMinutes(0)
        setIntervalSeconds(0)
        setMinutes(0)
        setMinutes(0)
        setRounds(1)
        setSeconds(0)
        setSeconds(0)
    }

    let setters 
    if (type === "Stopwatch" || type === "Countdown") {
        setters = <div className="chooser-panel"><TimeChooser {...data} /></div>
    } else if (type === "XY") {
        setters = (
            <div className="chooser-panel">
                <TimeChooser {...data} />
                <RoundChooser rounds={rounds} setRounds={setRounds}/>
            </div>
        )
    } else {
        setters = (
            <div className="chooser-panel">
                <TimeChooser {...data} />
                <TimeChooser {...intervalData} />
                <RoundChooser rounds={rounds} setRounds={setRounds}/>
            </div>
        )
    }

    return (
        <div className="add-timer">
            <h1>Add a Timer</h1>
            <span className="type-label">Choose type:</span>
            <select value={type} onChange={(e) => {setType(e.target.value)}}>
                <option value="">--</option>
                <option value="Countdown">Countdown</option>
                <option value="Stopwatch">Stopwatch</option>
                <option value="XY">XY</option>
                <option value="Tabata">Tabata</option>
            </select>
            {type && <div className="setter-container">{setters}</div>}
            {type && <Button classes="pause" onClick={addTimer}>Add Timer</Button>}

            <div className="back-buttons">
                <Button classes="pause" onClick={() => navigate("/")}>To home</Button>
                <Button classes="pause" onClick={() => navigate("/docs")}>To docs</Button>
            </div>
        </div>
    )
}