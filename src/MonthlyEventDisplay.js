import { ConfigContext } from "./App";
import { useContext } from 'react';
import { getDateString, getEventArray, showEvent } from './Classes.js';
import { Event } from './Classes.js';

/**
 * FETCH EVENTS HERE FROM DB
 */

const events =[new Event("Yoga Samstag", "Frohes Beisammensein mit Shawangata Yoga und Keksen.", "25.11.2023", 10, 30, 12, 180, []),new Event("Kiezziehe", "Abhängeeeee.", "25.11.2023", 18, 30, 12, 100, []), 
      new Event("Dharma Talk", "Kaffe und Philosophie! UwU", "23.11.2023", 12, 0, 8, 90, [])]

function MonthlyEventDisplay({selectedDate}){
    const conf = useContext(ConfigContext)[0]
    var id = ""
    var opened = ""
    let a = getEventArray(getDateString(selectedDate), events)
    if(a.length>0){
        return(
            <div className="termin-info-box-events">{selectedDate.toLocaleString("de",{month:"short", day:"numeric", year:"numeric"})}
                    <div className="event-container-monthly">
                        {a.map(ev=>{
                            id = `${ev.date},${ev.hourValue}:${ev.minuteValue}`
                            return(
                                <div>
                                    <div className='event-object-container-monthly' id = {id}>
                                        <h3>{ev.title}</h3>
                                        <em>{ev.date}, {ev.hourValue}:{("0"+ev.minuteValue).slice(-2)} Uhr, {ev.dauer} Minuten<br />
                                        {ev.bio}<br />
                                        Teilnehmer: {ev.participants.length}/{ev.spots}</em>
                                        <button>Jetzt anmelden!</button>
                                        <button onClick={(e)=>{e.target.parentNode.style.display="none";opened =""}}>Schließen</button>
                                    </div>
                                    <div className="event-div-monthly" id = {id+"-"}
                                         onClick={(e)=>{opened=showEvent(e.target.id, opened)}}>{ev.hourValue}<br></br>{("0"+ev.minuteValue).slice(-2)}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
        )
    }else{
        return(
            <div className="termin-info-box-events">{selectedDate.toLocaleString("de",{month:"short", day:"numeric", year:"numeric"})}
                    <div className="event-container-monthly">
                        <div className="no-events-monthly">
                            <p>Keine Events am {selectedDate.toLocaleString("de",{month:"short", day:"numeric", year:"numeric"})}</p>
                        </div>
                    </div>
                </div>
        )
    }
}
export default MonthlyEventDisplay;