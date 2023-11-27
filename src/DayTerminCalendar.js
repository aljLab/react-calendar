import { useContext, useState } from 'react';
import { ConfigContext } from './App.js';
import { Termin, TerminSlot, Kunde, Event } from './Classes.js';
import CalendarRow from './CalendarRow.js';
import TerminSlotContainer from './TerminSlotContainer.js';
import { getTimeSlotArray, taken, getDateString, getDatefromDatestring, getMonday, getEventDayArray, noEvent, startsEvent } from './Classes.js'

const events =[new Event("Yoga Samstag", "Frohes Beisammensein mit Shawangata Yoga und Keksen.", "25.11.2023", 10, 30, 12, 180, []), 
      new Event("Dharma Talk", "Kaffe und Philosophie! UwU", "23.11.2023", 12, 0, 8, 90, [])]
const dayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const termine= [new Termin("10", "00", "23.11.2023", "Anamnese", 4, new Kunde("Herr", "Ali", "Peters", "a@b.com", "123")), new Termin("15", "30", "23.11.2023", "Anamnese", 4, new Kunde("Herr", "Ali", "Peters", "a@b.com", "123"))];

/**
 * Termine should be fetched here from Database 
 */

function DayTerminCalendar({selected, setSelected}){
    const conf = useContext(ConfigContext)[0]
    const setConf = useContext(ConfigContext)[1]

    /**
     * Function needed for daily and weekly calendars
     * @param {*} index [0-6], for Mo-So
     * @returns array with all timeslots, which are within the business hours for this week day
     * WARNING: timeslots might be booked already
     */

    //CONDITIONAL RENDERING (Condition: Leistung chosen?)
    if(selected.leistung != "--"){
        let dayIndex= conf.date.getDay()==0? 6: conf.date.getDay()-1;
        let timeslots= getTimeSlotArray(dayIndex, conf.businessHours, conf.date, conf.granularity)
                //CONDITIONAL RENDERING (Condition: do timeslots exist for conf.date?)
                if(timeslots.length == 0){
                    return(
                        <div className ='calendar-day-daily-empty'>
                            <p>Keine verfügbaren Termine</p>
                        </div>
                    )
                }else{
                    let display = (selected.leistung !="--"&&selected.hourValue != null&&selected.minuteValue!=null)? "block":"none";
                    return(
                        <div className="calendar-day-daily">
                            <div className='termin-info-box'>{selected.leistung}, {selected.date}, {selected.hourValue}:{selected.minuteValue}</div>
                            <button className="buchen-button" style={{display: display}}>Buchen</button>
                            <div className = "day-slot-container-daily">
                            {timeslots.map(terminslot=>{
                                //Tag außerhalb der Betriebsferien?
                                //
                                //Termin taken?
                                
                                //Future slots in Länge conf.currentDauer frei?
                                let ts = terminslot
                                ts.endDate=new Date(ts.startDate.getTime()+selected.dauer*conf.granularity*60*1000)
                                if(taken(getDateString(conf.date), ts,termine)){
                                    return(
                                        <div className="termin-slot-daily-taken">
                                            {terminslot.startDate.getHours()}.{("0"+terminslot.startDate.getMinutes()).slice(-2)}
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div className="termin-slot-daily" id = {getDateString(conf.date)} onClick={(e)=>{
                                            let h = e.target.innerHTML.split(".")[0]
                                            let m = e.target.innerHTML.split(".")[1]
                                            let d = e.target.id
                                            let copy = {...selected}
                                            copy.hourValue = h
                                            copy.minuteValue = m
                                            copy.date = d
                                            setSelected(selected => copy)
                                        }}>
                                            {terminslot.startDate.getHours()}.{("0"+terminslot.startDate.getMinutes()).slice(-2)}
                                        </div>
                                    )
                                }
                                })}
                                </div>
                        </div>
                    )
                }
    }else{//Leistung needs to be chosen first to be able to calculate free timeslots
        return(
            <div className='calendar-day-daily'>
                <div className='calendar-day-daily-empty'>Bitte wählen Sie zuerst eine Leistung aus!</div>
            </div>
        )
    }
}
export default DayTerminCalendar;