import { useContext, useState } from 'react';
import { ConfigContext } from './App.js';
import { Termin, TerminSlot, Kunde, Event } from './Classes.js';
import { getTimeSlotArray, taken, getDateString, getMonday } from './Classes.js'

const events =[new Event("Yoga Samstag", "Frohes Beisammensein mit Shawangata Yoga und Keksen.", "25.11.2023", 10, 30, 12, 180, []), 
      new Event("Dharma Talk", "Kaffe und Philosophie! UwU", "23.11.2023", 12, 0, 8, 90, [])]
const dayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const termine= [new Termin("10", "00", "23.11.2023", "Anamnese", 4, new Kunde("Herr", "Ali", "Peters", "a@b.com", "123")), new Termin("15", "30", "23.11.2023", "Anamnese", 4, new Kunde("Herr", "Ali", "Peters", "a@b.com", "123"))];

function WeekTerminCalendar({selected, setSelected}){
    const conf = useContext(ConfigContext)[0]

    //CONDITIONAL RENDERING (Condition: Leistung selected?)
    if(selected.leistung != "--"){
        //if leistung AND Date AND time are chosen ------> display booking button
        let display = (selected.leistung !="--"&&selected.hourValue != null&&selected.minuteValue!=null)? "block":"none";
        return(
            <div className='main-container-calendar-weekly'>
                <div className='termin-info-box'>{selected.leistung}, {selected.date}, {selected.hourValue}:{selected.minuteValue}</div>
                <button className="buchen-button" style={{display: display}}>Buchen</button>
                <div className='calendar-slot-container-weekly'>
                    {[0,1,2,3,4,5].map(entry =>{ 
                        let currentDate = new Date(getMonday(conf.date).getTime()+entry*24*60*60*1000)
                        let timeslots= getTimeSlotArray(entry, conf.businessHours, conf.date, conf.granularity)
                        let cName = (timeslots.length == 0)? 'calendar-day-weekly'+'-empty':'calendar-day-weekly'
                        return(
                            <div className={cName}>
                                <span>{dayNames[entry]}</span>
                                <div className = "day-slot-container-weekly">
                                {timeslots.map(terminslot=>{
                                    //Tag außerhalb der Betriebsferien?
                                    //
                                    //Termin taken?
                                    
                                    //Future slots in Länge conf.currentDauer frei?
                                    let ts = terminslot
                                    ts.endDate=new Date(ts.startDate.getTime()+selected.dauer*conf.granularity*60*1000)
                                    if(taken(getDateString(currentDate), ts, termine)){
                                        return(
                                            <div className="termin-slot-weekly-taken">
                                                {terminslot.startDate.getHours()}.{("0"+terminslot.startDate.getMinutes()).slice(-2)}
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <div className="termin-slot-weekly" id = {getDateString(currentDate)}onClick={(e)=>{
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
                    })}
                </div>
            </div>
        )
    }else{
        return(
            <div className='calendar-slot-container-weekly'>
                <div className='calendar-day-daily-empty'>Bitte wählen Sie zuerst eine Leistung aus!</div>
            </div>
        )
    }
}
export default WeekTerminCalendar;