import { ConfigContext } from "./App";
import { useContext } from 'react';
import CalendarSettings from "./CalendarSettings";
import CalendarLeistung from "./CalendarLeistung";
import DayCalendarNav from "./DayCalendarNav";
import DayEventCalendar from "./DayEventCalendar";
import DayTerminCalendar from "./DayTerminCalendar";


function DayCalendar({selected, setSelected}){
    const conf = useContext(ConfigContext)[0]
    const setConf = useContext(ConfigContext)[1]


    //CONDITIONAL RENDERING (Condition: showEvents)
    if(conf.showEvents){
        return(
            <div className="main-container">
                <DayCalendarNav></DayCalendarNav>
                <CalendarSettings></CalendarSettings>
                <DayEventCalendar></DayEventCalendar>
            </div>
        )

    }else{
        return(
            <div className='main-container'>
                <DayCalendarNav></DayCalendarNav>
                <CalendarSettings></CalendarSettings>
                <CalendarLeistung selected = {selected} setSelected={setSelected}></CalendarLeistung>
                <DayTerminCalendar selected = {selected} setSelected={setSelected}></DayTerminCalendar>
            </div>
        )
    }
}

export default DayCalendar;