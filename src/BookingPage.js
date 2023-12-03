import { ConfigContext } from './App.js';
import { useContext } from 'react';
import React from 'react';
    
function BookingPage({selected}){
    const conf = useContext(ConfigContext)[0]
    const setConf = useContext(ConfigContext)[1]
    return(
        <div className="booking-container-termine">
            <div className="booking-box-header">
                <div className="back-button-container">
                <button className = "back-button" onClick={()=>{
                    let copy = {...conf}
                    copy.location = "calendar"
                    setConf(conf => copy)
                }}>Zurück</button>
                </div>
                <div className='header-booking-container'>Terminbuchung</div>
            </div>
            <div className='termin-info-box'>{selected.leistung}, {selected.date}, {selected.hourValue}:{selected.minuteValue}</div>
            <form id="booking-form-termine">
                <label className = "label-termine-booking" htmlFor="anrede">Anrede</label>
                <input type="text" id="anrede" placeholder="Anrede" required></input>
                <label className = "label-termine-booking" htmlFor="vorname">Vorname</label>
                <input type="text" id="vorname" placeholder="Vorname" required></input>
                <label className = "label-termine-booking" htmlFor="nachname">Nachname</label>
                <input type="text" id="nachname" placeholder="Nachname" required></input>
                <label className = "label-termine-booking" htmlFor="mail">E-Mail</label>
                <input type="text" id=",ail" placeholder="E-Mail" required></input>
                <label className = "label-termine-booking" htmlFor="phone">Telefon</label>
                <input type="text" id="phone" placeholder="Telefonnummer" required></input>
                <button type ="submit" id="submit-button-termine">Termin verbindlich buchen</button>
            </form>
        </div>
    )
}
export default BookingPage;