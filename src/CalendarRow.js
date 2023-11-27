import { getDateString, getWeekArray, getDatefromDatestring } from './Classes.js';

function CalendarRow({startdate, sel, setSel}){
    const sd= startdate;
    let dayIndex = sd.getDay()==0?6: sd.getDay()-1
    let d= getDatefromDatestring(sel.date, sel.hourValue, sel.minuteValue)
    return(
        <div className="calendar-row">
            {getWeekArray(sd, dayIndex).map(day=>{
                let cname="calendar-day-monthly"
                if((startdate.getFullYear()==d.getFullYear())&&(startdate.getMonth()==d.getMonth())&&(d.getDate()==day)){
                    cname = "calendar-day-selected"
                }else if((startdate.getFullYear()==new Date().getFullYear())&&(startdate.getMonth()==new Date().getMonth())&&(new Date().getDate()==day)){
                    cname = "calendar-day-today"
                }
                return(
                    <div className = {cname} onClick={(e)=>{
                        let copy = {...sel}
                        copy.date=getDateString(new Date(startdate.getFullYear(),startdate.getMonth(), e.target.innerHTML))
                        setSel(sel => copy)
                    }}>{day}</div>
                )
            })}
        </div>
    )
}
export default CalendarRow;