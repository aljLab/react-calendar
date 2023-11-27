import { ConfigContext } from "./App";
import { useContext } from 'react';
import pl from "./pfeil_links.png";
import pr from "./pfeil_rechts.png";
import { calculateWeek, getMonday } from './Classes.js';


/**
 * relies on the conf-object (provided by ConfigContext) to display and update the current week
 * @returns Calendar Navigation (two buttons and one display) for week calendars
 */

function WeekCalendarNav(){
    const conf = useContext(ConfigContext)[0]
    const setConf = useContext(ConfigContext)[1]
    return(
        <div className = "calendar-nav">
              <button className='calendar-button-weekly' onClick={()=>{
                                                      let copy = {...conf}
                                                      copy.date=new Date(getMonday(conf.date).getTime()-7*24*60*60*1000)
                                                      setConf(conf => copy)}}>
                  <img className="pfeil-button" src={pl}></img>
                </button>
              <div className='week-display-navbar-weekly'>{calculateWeek(conf.date)}</div>
              <button className='calendar-button-weekly' onClick={()=>{
                                                      let copy = {...conf}
                                                      copy.date=new Date(getMonday(conf.date).getTime()+7*24*60*60*1000)
                                                      setConf(conf => copy)}}>
                  <img className="pfeil-button" src={pr}></img>
                </button>
            </div>
    )
}
export default WeekCalendarNav;