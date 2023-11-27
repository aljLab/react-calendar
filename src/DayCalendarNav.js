import { ConfigContext } from "./App.js";
import { useContext } from 'react';
import pl from "./pfeil_links.png";
import pr from "./pfeil_rechts.png";

/**
 * relies on the conf-object (provided by ConfigContext) to display and update the current Day
 * @returns Calendar Navigation (two buttons and one display) for Day calendars
 */

function DayCalendarNav(){
    const conf = useContext(ConfigContext)[0]
    const setConf = useContext(ConfigContext)[1]
    return(
        <div className = "calendar-nav">
                <button className='calendar-button-weekly' onClick={()=>{
                  let copy = {...conf}
                  copy.date=new Date(conf.date.getFullYear(), conf.date.getMonth(), conf.date.getDate()-1)
                  setConf(conf => copy)
                  }}>
                    <img className="pfeil-button" src={pl}></img>
                  </button>
                <div className='week-display-navbar-monthly'>{conf.date.toLocaleString("de", {weekday: "short", year:"numeric", month:"numeric", day:"numeric"})}</div>
                <button className='calendar-button-weekly' onClick={()=>{
                  let copy = {...conf}
                  copy.date=new Date(conf.date.getFullYear(), conf.date.getMonth(), conf.date.getDate()+1)
                  setConf(conf => copy)
                  }}>
                    <img className="pfeil-button" src={pr}></img>
                  </button>
              </div>
    )
}
export default DayCalendarNav;