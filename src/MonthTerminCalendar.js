import { useContext } from 'react';
import { ConfigContext } from './App.js';
import { Termin, Kunde, Event } from './Classes.js';
import CalendarRow from './CalendarRow.js';
import TerminSlotContainer from './TerminSlotContainer.js';
import { getMonthArray } from './Classes.js';

const events =[new Event("Yoga Samstag", "Frohes Beisammensein mit Shawangata Yoga und Keksen.", "25.11.2023", 10, 30, 12, 180, []), 
      new Event("Dharma Talk", "Kaffe und Philosophie! UwU", "23.11.2023", 12, 0, 8, 90, [])]
const dayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const termine= [new Termin("10", "00", "23.11.2023", "Anamnese", 4, new Kunde("Herr", "Ali", "Peters", "a@b.com", "123")), new Termin("15", "30", "23.11.2023", "Anamnese", 4, new Kunde("Herr", "Ali", "Peters", "a@b.com", "123"))];

/**
 * Month Calendar: Version Booking appointments 
 *  --> displays bookable timeslots an drequires the user to pick Leistung to book
 */

function MonthTerminCalendar({selected, setSelected}){
    const conf = useContext(ConfigContext)[0]
    const setConf = useContext(ConfigContext)[1]

    let monthArray=getMonthArray(conf.date)

    if(selected.leistung != "--"){
        let display = (selected.leistung !="--"&&selected.hourValue != null&&selected.minuteValue!=null)? "block":"none";
        return(
            <div className='main-container-monthly'>
                <div className='termin-info-box'>{selected.leistung}, {selected.date}, {selected.hourValue}:{selected.minuteValue}</div>
                <button className="buchen-button" style={{display: display}} onClick={()=>{
                    let copy = {...conf}
                    copy.location = "booking"
                    setConf(conf => copy)
                }}>Buchen</button>
                <TerminSlotContainer selected = {selected} setSelected = {setSelected}></TerminSlotContainer>
                <div className="row-container-monthly">
                    {monthArray.map(startdate =>{
                            return(
                                <CalendarRow startdate={startdate} sel = {selected} setSel ={setSelected}></CalendarRow>
                            )
                        }
                    )}
                </div>
            </div>
        )
    }else{
        return(
            <div className='main-container-monthly'>
                <div className='calendar-day-daily-empty'>Bitte wählen Sie zuerst eine Leistung aus!</div>
            </div>
        )
    }

}
export default MonthTerminCalendar;