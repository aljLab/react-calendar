import { getWeekArray } from './Classes.js';
import { useContext } from 'react';
import { ConfigContext } from './App.js'

function CalendarRowEvents({startdate, selectedDate, setSelectedDate}){
    const conf = useContext(ConfigContext)[0]
    const sd= startdate;
    let dayIndex = sd.getDay()==0?6: sd.getDay()-1
    return(
        <div className="calendar-row">
            {getWeekArray(sd, dayIndex).map(day=>{
                let cname="calendar-day-monthly"
                if((startdate.getFullYear()==new Date().getFullYear())&&(startdate.getMonth()==new Date().getMonth())&&(new Date().getDate()==day)){
                    cname = "calendar-day-today"
                }
                return(
                    <div className = {cname} onClick={(e)=>{
                        let prev = document.getElementById("selected-date-event-monthly")
                        prev?prev.id = null: console.log("prev is undefined")
                        e.target.id="selected-date-event-monthly"
                        console.log("clicked: "+e.target.id)
                        setSelectedDate(selectedDate=>new Date(conf.date.getFullYear(), conf.date.getMonth(), e.target.innerHTML))
                    }}>{day}</div>
                )
            })}
        </div>
    )
}
export default CalendarRowEvents;