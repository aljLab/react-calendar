import { ConfigContext } from "./App";
import { useContext } from 'react';
import CalendarSettings from "./CalendarSettings";
import CalendarLeistung from "./CalendarLeistung";
import WeekCalendarNav from "./WeekCalendarNav.js";
import WeekTerminCalendar from "./WeekTerminCalendar.js";
import WeekEventCalendar from "./WeekEventCalendar.js";

function WeekCalendar({selected, setSelected}){
    const conf= useContext(ConfigContext)[0]
    if(conf.showEvents){
        return(
            <div className='main-container'>
            <WeekCalendarNav></WeekCalendarNav>
            <CalendarSettings></CalendarSettings>
            <WeekEventCalendar></WeekEventCalendar>
        </div>
        )
    }else{
        return(
            <div className='main-container'>
                <WeekCalendarNav></WeekCalendarNav>
                <CalendarSettings></CalendarSettings>
                <CalendarLeistung selected = {selected} setSelected={setSelected}></CalendarLeistung>
                <WeekTerminCalendar selected = {selected} setSelected={setSelected}></WeekTerminCalendar>
          </div>
        )
    }
}
export default WeekCalendar;