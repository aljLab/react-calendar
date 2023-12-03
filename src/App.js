import './App.css';
import { useState } from 'react';
import React from 'react'
import { Termin, Kunde, Event } from './Classes.js';
import { getDateString } from './Classes.js';
import DayCalendar from './DayCalendar.js';
import MonthCalendar from './MonthCalendar.js';
import WeekCalendar from './WeekCalendar.js';
import BookingPage from './BookingPage.js';


export const ConfigContext = React.createContext()

function App() {

  //INITIALISIERUNGEN
  //selected is a termin-Object continuously updated when user selects or enters the required information
  const [selected, setSelected]=useState(new Termin(null, null, getDateString(new Date()), "--", 4, new Kunde("", "","","","","")));
  /**
   * Conf contains parameters on how the calendar is supposed to be displayed:
   *  -----calendarType: "weekly", "monthly", "daily";
   *  -----showEvents: true (shows events, not appointments), false (shows free timeslots (bookables))
   *  -----businessHours: Array mit je einem Array mit timeslots für jeden Tag der Form [[10.00-15.00], [17.00-19.00]]
   *  -----date (serves as counterdate to keep track of where the user is currently at in the calendar)
   *  -----currentDate := the actual date of actual today
   *  -----currentDauer: to be set by Leistungsselect -> contains the dauer of the currently chosen Leistung
   *  -----granularity: width of timeslots to be displayed
   */
  const [conf, setConf]=useState({date: new Date(), granularity: 15, calendarType: "daily", 
      showEvents: false, currentDate: new Date(), 
      businessHours: [["8.00-12.00","-"],["-"],["-"],["9.30-13.00","15.00-19.00", "-"],["15.00-19.00","-"]], 
      currentDauer: 4, location: "calendar"});

//CONDITIONAL RENDERING (Condition: calendarType)

if(conf.location==="calendar"){
  if(conf.calendarType ==="weekly"){//WOCHENKALENDER
    return (
      <ConfigContext.Provider value={[conf, setConf]}>
        <WeekCalendar selected = {selected} setSelected={setSelected}></WeekCalendar>
      </ConfigContext.Provider>
    )
  }else if(conf.calendarType==="monthly"){//MONATSKALENDER
        return (
          <ConfigContext.Provider value={[conf, setConf]}>
            <MonthCalendar selected = {selected} setSelected = {setSelected}></MonthCalendar>
          </ConfigContext.Provider>
        )
  }else if(conf.calendarType==="daily"){//TAGESKALENDER  
        return (
          <ConfigContext.Provider value={[conf, setConf]}>
            <DayCalendar selected = {selected} setSelected={setSelected}></DayCalendar>
          </ConfigContext.Provider>
        )
  }
}else{
  return(
   <ConfigContext.Provider value ={[conf, setConf]}>
      <div className='main-container'>
        <BookingPage selected = {selected}></BookingPage>
      </div>
   </ConfigContext.Provider>
  )
}
}

export default App;
