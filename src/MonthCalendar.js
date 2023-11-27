import { ConfigContext } from "./App";
import { useContext, useState } from 'react';
import CalendarSettings from "./CalendarSettings";
import CalendarLeistung from "./CalendarLeistung";
import MonthCalendarNav from "./MonthCalendarNav";
import MonthTerminCalendar from "./MonthTerminCalendar";
import MonthEventCalendar from "./MonthEventCalendar";
import { Event } from './Classes.js';
import MonthlyEventDisplay from "./MonthlyEventDisplay.js";


function MonthCalendar({selected, setSelected}){
    const conf = useContext(ConfigContext)[0]
    const [selectedDate, setSelectedDate]=useState(conf.date)
    if(conf.showEvents){
        return(
            <div className='main-container'>
                <MonthCalendarNav></MonthCalendarNav>
                <CalendarSettings></CalendarSettings>
                <MonthlyEventDisplay selectedDate={selectedDate}></MonthlyEventDisplay>
                <MonthEventCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}></MonthEventCalendar>
            </div>
        )
    }else{
        return(
            <div className='main-container'>
                <MonthCalendarNav></MonthCalendarNav>
                <CalendarSettings></CalendarSettings>
                <CalendarLeistung selected = {selected} setSelected={setSelected}></CalendarLeistung>
                <MonthTerminCalendar selected ={selected} setSelected={setSelected}></MonthTerminCalendar>
            </div>
        )
    }
}


export default MonthCalendar;
