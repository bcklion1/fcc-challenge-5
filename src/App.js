import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {useState,useEffect} from 'react';
import { useInsertionEffect } from 'react';

function timeify(time) {
  let minutes = Math.floor(time/60);
  let seconds = time%60;
  seconds = seconds < 10 ? '0'+seconds : seconds;
  return `${minutes}:${seconds}`;
}



function App() {
  const [title,setTitle]=useState("Session");
  const [breakTime,setBreak]=useState(5);
  const [sessionTime,setSession]=useState(25);
  const [acceptInput,setAcceptInput]=useState(true);



  return (
    <div>
      <h1 className='text bigger'>25 + 5 Clock</h1>
      <div className="flex">
        <div>
          <div className="selector break">Break Length</div>
          <div className="inputs">
            <button onClick={()=>setBreak(breakTime+1)} className="button left"><FontAwesomeIcon icon={faArrowUp} size="2x"/></button>
            <p className="left in">{breakTime}</p>
            <button onClick={()=>setBreak(breakTime-1)} className="button left"><FontAwesomeIcon icon={faArrowDown} size="2x"/></button>
          </div>
        </div>
        <div>
          <div className="selector session">Session Length</div>
          <div className="inputs">
            <button onClick={()=>setSession(sessionTime+1)} className="button left"><FontAwesomeIcon icon={faArrowUp} size="2x"/></button>
            <p className="left in">{sessionTime}</p>
            <button onClick={()=>setSession(sessionTime-1)} className="button left"><FontAwesomeIcon icon={faArrowDown} size="2x"/></button>
          </div>
        </div>
      </div>
      <Clock breakTime={breakTime} sessionTime={sessionTime} title={title}/>
    </div>
  );
}


const Clock = (props) => {
  let timer= props.title==="Session" ? props.sessionTime*60 : props.breakTime*60;
  useEffect(()=>{
    timer= props.title==="Session" ? props.sessionTime*60 : props.breakTime*60;
  })
  return(
    <div className="clock">
      <div className='clockTitle'>{props.title}</div>
      <div className="clockTime">{timeify(timer)}</div>
    </div>
  )
}
export default App;
