import { useContext, useState } from 'react';
import { ConfigContext } from './App.js';
import { Event } from './Classes.js';
import { getMonthArray } from './Classes.js';
import CalendarRowEvents from './CalendarRowEvents.js';

const events =[new Event("Yoga Samstag", "Frohes Beisammensein mit Shawangata Yoga und Keksen.", "25.11.2023", 10, 30, 12, 180, []), 
      new Event("Dharma Talk", "Kaffe und Philosophie! UwU", "23.11.2023", 12, 0, 8, 90, [])]

function MonthEventCalendar({selectedDate, setSelectedDate}){
    const conf = useContext(ConfigContext)[0]

    let monthArray=getMonthArray(conf.date)
        return(
            <div className='main-container-monthly'>
                <div className="row-container-monthly">
                    {monthArray.map(startdate =>{
                            return(
                                    <CalendarRowEvents startdate={startdate} selectedDate={selectedDate} setSelectedDate={setSelectedDate}></CalendarRowEvents>
                            )
                        }
                    )}
                </div>
            </div>
        )
}
export default MonthEventCalendar;