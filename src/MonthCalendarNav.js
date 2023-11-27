import { ConfigContext } from "./App.js";
import { useContext } from 'react';
import pl from "./pfeil_links.png";
import pr from "./pfeil_rechts.png";

/**
 * relies on the conf-object (provided by ConfigContext) to display and update the current Month
 * @returns Calendar Navigation (two buttons and one display) for Month calendars
 */

function MonthCalendarNav(){
    const conf = useContext(ConfigContext)[0]
    const setConf = useContext(ConfigContext)[1]
    return(
        <div className = "calendar-nav">
                <button className='calendar-button-weekly' onClick={()=>{
                                                      let copy = {...conf}
                                                      copy.date=new Date(conf.date.getFullYear(), conf.date.getMonth()-1, 1)
                                                      setConf(conf => copy)}}>
                    <img className="pfeil-button" src={pl}></img>
                  </button>
                <div className='week-display-navbar-monthly'>{conf.date.toLocaleString("de", {month:'long'})} {conf.date.getFullYear()}</div>
                <button className='calendar-button-weekly' onClick={()=>{
                                                      let copy = {...conf}
                                                      copy.date=new Date(conf.date.getFullYear(), conf.date.getMonth()+1, 1)
                                                      setConf(conf => copy)}}>
                    <img className="pfeil-button" src={pr}></img>
                  </button>
              </div>
    )
}
export default MonthCalendarNav;