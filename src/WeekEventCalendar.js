import { useContext, useState } from 'react';
import { ConfigContext } from './App.js';
import { Termin, TerminSlot, Kunde, Event } from './Classes.js';
import { getEventDayArray, noEvent, startsEvent, getMonday, showEvent } from './Classes.js'

const events =[new Event("Yoga Samstag", "Frohes Beisammensein mit Shawangata Yoga und Keksen.", "25.11.2023", 10, 30, 12, 180, []),new Event("Kiezziehe", "Abhängeeeee.", "25.11.2023", 18, 30, 12, 100, []), 
      new Event("Dharma Talk", "Kaffe und Philosophie! UwU", "23.11.2023", 12, 0, 8, 90, [])]
const dayNames=["Mo", "Di", "Mi", "Do", "Fr", "Sa"]
var opened = ""
//<div className='relative-parent-event-block'>
//<div className="event-slot-weekly-taken">{ts.startDate.getHours()}:{("0"+ts.startDate.getMinutes()).slice(-2)}</div>
function WeekEventCalendar(){
    const conf = useContext(ConfigContext)[0]
        return(
            <div className='main-container-calendar-weekly'>
                <div className='calendar-slot-container-weekly'>
                    {[0,1,2,3,4,5].map(entry =>{ 
                        let m = getMonday(conf.date)
                        let currentDate = new Date(m.getTime()+entry*24*60*60*1000)
                        let timeslots= getEventDayArray(new Date(m.getFullYear(), m.getMonth(), m.getDate()+entry, 8, 0), new Date(m.getFullYear(), m.getMonth(), m.getDate()+entry, 20, 0), 30)
                        var id = ""
                        var addOn = 0
                        return(
                            <div className='calendar-day-weekly-events'>
                                <span>{dayNames[entry]}</span>
                                <div className = "day-slot-container-weekly-events">
                                {timeslots.map(ts=>{
                                    if(noEvent(events, ts)){
                                        return(
                                            <div className="event-slot-weekly">{ts.startDate.getHours()}:{("0"+ts.startDate.getMinutes()).slice(-2)}</div>
                                        )
                                    }else if(startsEvent(events, ts)){
                                        let ev = startsEvent(events, ts)
                                        id = ts.startDate.toLocaleString("de")+"-"
                                        return(
                                                <div>
                                                    <div className='event-object-container-weekly' id = {id.split("-")[0]}>
                                                    <h3>{ev.title}</h3>
                                                    <em>{ev.date}, {ev.hourValue}:{("0"+ev.minuteValue).slice(-2)} Uhr, {ev.dauer} Minuten<br />
                                                    {ev.bio}<br />
                                                    Teilnehmer: {ev.participants.length}/{ev.spots}</em>
                                                    <button>Jetzt anmelden!</button>
                                                    <button onClick={(e)=>{e.target.parentNode.style.display="none";opened =""}}>Schließen</button>
                                                    </div>
                                                    <div className="event-slot-weekly-taken" 
                                                        id = {id+String(addOn)} //localestring+addOn zahl
                                                        onClick={(e)=>{opened=showEvent(e.target.id, opened)}}
                                                        style={{borderTop:"2px solid rgb(140,140,140)",borderBottom:"0px", fontWeight:"bold", color:"rgb(80,80,80"}}>
                                                        {ts.startDate.getHours()}:{("0"+ts.startDate.getMinutes()).slice(-2)}
                                                    </div>
                                                </div>
                                        )
                                    }else{
                                        addOn++
                                        return(
                                            <div className="event-slot-weekly-taken" 
                                            id = {id+String(addOn)} //localestring+addOn zahl
                                            onClick={(e)=>{opened=showEvent(e.target.id, opened)}}>
                                                {ts.startDate.getHours()}:{("0"+ts.startDate.getMinutes()).slice(-2)}
                                            </div>
                                        )
                                    }
                                    })}
                                    </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
}
export default WeekEventCalendar;
