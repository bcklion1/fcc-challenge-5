import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp,faArrowRotateRight,faPlay,faPause} from '@fortawesome/free-solid-svg-icons';
import {useState,useEffect} from 'react';
// import accurateInterval from 'accurate-interval';





function timeify(time) {
      let minutes = Math.floor(time/60);
      let seconds = time%60;
      seconds = seconds < 10 ? '0'+seconds : seconds;
      return `${minutes}:${seconds}`;
    }

let beep;
function App() {

  const [title,setTitle]=useState("Session");
  const [breakTime,setBreak]=useState(5);
  const [sessionTime,setSession]=useState(25);
  const [timerState,setTimerState]=useState(true);  //true = stop false = running
  const [timer,setTimer]=useState(25*60)
  const [intervalID,setID]=useState('')

  const accurateInterval = function (fn, time) {
    var cancel, nextAt, timeout, wrapper;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = function () {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return fn();
    };
    cancel = function () {
      return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
      cancel: cancel
    }
  }

useEffect(()=>{
  if (timer>-1){
    return
  }
  if (title==="Session"){
    beep.play()
    setTitle("Break")
    setTimer(breakTime*60)
  }
  else{
    beep.play()
    setTitle("Session")
    setTimer(sessionTime*60)
  }
},[timer,breakTime,sessionTime,title])

  function timerControl() {
    if (timerState === true) {
      play();
      setTimerState(false);
    } else {
      setTimerState(true)
      if (intervalID) {
        intervalID.cancel();
      }
    }
  }

  function restart(){
    if (intervalID){
      intervalID.cancel()
    }

    setTitle("Session")
    setTimer(25*60)
    setBreak(5)
    setSession(25)
    setTimerState(true)
  }

  function play(){
    setID(accurateInterval(() => {
      decTimer()
    }, 1000))
  }

  function decTimer(){
    setTimer(prevTime => prevTime - 1)
  }

  function inc(type){
    if(timerState){
      if ((type==="break")&&(breakTime!==60)){
      setBreak(breakTime+1)
      if (title==="Break"){
        setTimer((breakTime+1)*60)
      }
    }
    else{
      if (sessionTime!==60){
      setSession(sessionTime+1)
      if (title==="Session"){
        setTimer((sessionTime+1)*60)
      }}
    }
  }    
  }

  function dec(type){
    if(timerState){
      if ((type==="break")&&(breakTime!==1)){
      setBreak(breakTime-1)
      if (title==="break"){
        setTimer((breakTime-1)*60)
      }
    }
    else{
      if (sessionTime!==1){
        setSession(sessionTime-1)
        if (title==="Session"){
          setTimer((sessionTime-1)*60)
        }
    }
    }
  }
  }

  return (
    <div>
      <h1 className='text bigger'>25 + 5 Clock</h1>
      <div className="flex">
        <div>
          <div className="selector break">Break Length</div>
          <div className="inputs">
            <button id="break-increment" onClick={()=>{inc("break")}} className="button left"><FontAwesomeIcon icon={faArrowUp} size="2x"/></button>
            <p id="break-label" className="left in">{breakTime}</p>
            <button id="break-decrement" onClick={()=>{dec("break")}} className="button left"><FontAwesomeIcon icon={faArrowDown} size="2x"/></button>
          </div>
        </div>
        <div>
          <div className="selector session">Session Length</div>
          <div className="inputs">
            <button id="session-increment" onClick={()=>{inc("session")}} className="button left"><FontAwesomeIcon icon={faArrowUp} size="2x"/></button>
            <p id="session-label" className="left in">{sessionTime}</p>
            <button id="session-decrement" onClick={()=>{dec("session")}} className="button left"><FontAwesomeIcon icon={faArrowDown} size="2x"/></button>
          </div>
        </div>
      </div>


      <><div className="clock">
      <div id="timer-label" className='clockTitle'>{title}</div>
      <div id="time-left" className="clockTime">{timeify(timer)}</div>
    </div><div className='controls flex'>
        <button id="reset" onClick={()=>restart()}><FontAwesomeIcon icon={faArrowRotateRight} size="2x"/></button>
        <button id="start_stop" onClick={()=>timerControl()}><FontAwesomeIcon icon={faPlay} size="2x"/><FontAwesomeIcon icon={faPause} size="2x"/></button>
      </div></>
      <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            beep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />

    </div>
  );
}


// const Clock = (props) => {
//   const [intervalID,setIntervalID]=useState("")
  
//   function beginCountDown() {
//     setIntervalID(accurateInterval(() => {
//       decrementTimer();
//       phaseControl();
//     }, 1000))
//   }

//   function decrementTimer() {
//     props.setTimer(props.timer-1)
//   }

//   function phaseControl() {
//     let timer = props.timer;
//     buzzer(timer);
//     if (timer < 0) {
//       if (intervalID) {
//         intervalID.cancel();
//       }
//       if (props.title === 'Session') {
//         beginCountDown();
//         switchTimer(props.breakTime * 60, 'Break');
//       } else {
//         beginCountDown();
//         switchTimer(props.sessionTime * 60, 'Session');
//       }
//     }
//   }

//   function switchTimer(num, str) {
//     props.setTimer(num)
//     props.setTitle(str)
//   }

//   function buzzer(_timer) {
//     if (_timer === 0) {
//       this.audioBeep.play();
//     }
//   }

//   function timeify(time) {
//     let minutes = Math.floor(time/60);
//     let seconds = time%60;
//     seconds = seconds < 10 ? '0'+seconds : seconds;
//     return `${minutes}:${seconds}`;
//   }
  

//   function restart(){
//     props.setTimer(props.title==="Session" ? props.sessionTime*60 : props.breakTime*60)
//     console.log("ran")
//   }
//   function play(){

//   }

//   return(
//     <><div className="clock">
//       <div className='clockTitle'>{props.title}</div>
//       <div className="clockTime">{timeify(props.timer)}</div>
//     </div><div className='controls flex'>
//         <button onClick={()=>restart()}><FontAwesomeIcon icon={faArrowRotateRight} size="2x"/></button>
//         <button onClick={()=>play()}><FontAwesomeIcon icon={faPlay} size="2x"/><FontAwesomeIcon icon={faPause} size="2x"/></button>
//       </div></>
//   )
// }

export default App;
