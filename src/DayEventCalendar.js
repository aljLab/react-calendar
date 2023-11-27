import { useContext, useState } from 'react';
import { ConfigContext } from './App.js';
import { Event } from './Classes.js';
import { getEventDayArray, noEvent, startsEvent } from './Classes.js';

const events =[new Event("Yoga Samstag", "Frohes Beisammensein mit Shawangata Yoga und Keksen.", "25.11.2023", 10, 30, 12, 180, []), 
      new Event("Dharma Talk", "Kaffe und Philosophie! UwU", "23.11.2023", 12, 0, 8, 90, [])]
 
/** NOTE: here events should be fetched from Db
 * Does not rely on selected/setSelected (no prop drilling)
 * @returns Day Calendar, which displayes the events 
 */

function DayEventCalendar(){
    const conf = useContext(ConfigContext)[0]
    let eda = getEventDayArray(new Date(conf.date.getFullYear(), conf.date.getMonth(), conf.date.getDate(), 8, 0), new Date(conf.date.getFullYear(), conf.date.getMonth(), conf.date.getDate(), 20, 0), 30)
    return(
            <div className="calendar-day-daily">
                {eda.map(ts=>{
                    if(noEvent(events, ts)){
                        return(
                            <div className="event-slot-daily">{ts.startDate.getHours()}:{("0"+ts.startDate.getMinutes()).slice(-2)}</div>
                        )
                    }else if(startsEvent(events, ts)){
                        let ev = startsEvent(events, ts)
                        let ar = [...Array(ev.dauer/30).keys()].map(x=>x+1)
                        let height= (ev.dauer/30*4+ev.dauer/30*0.125-0.55)+"rem"
                        return(
                            <div className='relative-parent-event-block'>
                                <div className='event-object-container' style={{height: height}}>
                                    <h2>{ev.title}</h2>
                                    <em>{ev.date}, {ev.hourValue}:{("0"+ev.minuteValue).slice(-2)} Uhr, {ev.dauer} Minuten<br />
                                    {ev.bio}<br />
                                    Teilnehmer: {ev.participants.length}/{ev.spots}</em>
                                    <button>Jetzt anmelden!</button>
                                </div>
                                <div className="event-slot-daily-taken">{ts.startDate.getHours()}:{("0"+ts.startDate.getMinutes()).slice(-2)}</div>
                            </div>
                        )
                    }else{
                        return(
                            <div className="event-slot-daily-taken">{ts.startDate.getHours()}:{("0"+ts.startDate.getMinutes()).slice(-2)}</div>
                        )
                    }
                })}
            </div>
    )
}
export default DayEventCalendar;