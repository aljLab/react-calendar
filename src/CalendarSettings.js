import { useContext } from 'react'
import { ConfigContext } from './App.js'

function CalendarSettings(){
    const conf = useContext(ConfigContext)[0]
    const setConf = useContext(ConfigContext)[1]
    return(
        <div className="calendar-setting-container">
            <form className= "settings-form">
            <fieldset>
        
            <div>
                <input type="radio" id="daily" name="darstellung" value="daily" onChange={(e)=>{
                        let copy = {...conf}
                        copy.calendarType = "daily"
                        setConf(conf => copy)
                        }
                }/>
                <label htmlFor="daily">Tageskalender</label>
            </div>

            <div>
                <input type="radio" id="weekly" name="darstellung" value="weekly" onChange={(e)=>{
                        let copy = {...conf}
                        copy.calendarType = "weekly"
                        setConf(conf => copy)
                }}/>
                <label htmlFor="weekly">Wochenkalender</label>
            </div>

            <div>
                <input type="radio" id="monthly" name="darstellung" value="monthly" onChange={(e)=>{
                        let copy = {...conf}
                        copy.calendarType = "monthly"
                        setConf(conf => copy)
                    }
                }/>
                <label htmlFor="monthly">Monatskalender</label>
            </div>
            </fieldset>
            </form>
            <form className= "settings-form">
            <fieldset>
        
            <div>
                <input type="radio" id="termine" name="events" value={false} onChange={(e)=>{
                        let copy = {...conf}
                        copy.showEvents = false
                        setConf(conf => copy)
                        }
                }/>
                <label htmlFor="termine">Termine</label>
            </div>

            <div>
                <input type="radio" id="eventsTrue" name="events" value={true} onChange={(e)=>{
                        let copy = {...conf}
                        copy.showEvents = true
                        setConf(conf => copy)
                }}/>
                <label htmlFor="eventsTrue">Events</label>
            </div>
            </fieldset>
            </form>
            <div className='settings-option-container'>
                <div className="settings-option-field" onClick={(e)=>{
                    let copy = {...conf}
                    copy.calendarType = "daily"
                    setConf(conf => copy)}}>Tages<br></br>kalender</div>
                <div className="settings-option-field"onClick={(e)=>{
                    let copy = {...conf}
                    copy.calendarType = "weekly"
                    setConf(conf => copy)}}>Wochen<br></br>kalender</div>
                <div className="settings-option-field" onClick={(e)=>{
                    let copy = {...conf}
                    copy.calendarType = "monthly"
                    setConf(conf => copy)}}>Monats<br></br>kalender</div>
            </div>
        </div>
    )
}

export default CalendarSettings;