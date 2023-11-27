import { useContext } from 'react';
import { ConfigContext } from './App.js';
import { TerminSlot, Termin, Kunde}  from './Classes.js';
import { getDateString, taken, getDatefromDatestring, getTimeSlotArray } from './Classes.js';

const termine= [new Termin("10", "00", "23.11.2023", "Anamnese", 4, new Kunde("Herr", "Ali", "Peters", "a@b.com", "123")), new Termin("15", "30", "23.11.2023", "Anamnese", 4, new Kunde("Herr", "Ali", "Peters", "a@b.com", "123"))];

function TerminSlotContainer({selected, setSelected}){
    const conf= useContext(ConfigContext)[0]

    var d=getDatefromDatestring(selected.date, selected.hourValue, selected.minuteValue)
    let dayIndex = d.getDay()==0?6:d.getDay()-1
    let timeslots=getTimeSlotArray(dayIndex, conf.businessHours, conf.date, conf.granularity)

    //CONDITIONAL RENDERING (Condition: do free timeslots exist on conf.date?)
    if(timeslots.length!=0){
        return(
            <div className="termin-slot-container-monthly">
                {timeslots.map(terminslot=>{
                        //Tag außerhalb der Betriebsferien?
                        //
                        //Termin taken?
                        //Future slots in Länge conf.currentDauer frei?
                        let ts = terminslot
                        ts.endDate=new Date(ts.startDate.getTime()+selected.dauer*conf.granularity*60*1000)
                        if(taken(getDateString(d), ts, termine)){
                            return(
                                <div className="termin-slot-monthly-taken">
                                    {terminslot.startDate.getHours()}.{("0"+terminslot.startDate.getMinutes()).slice(-2)}
                                </div>
                            )
                        }else{
                            return(
                                <div className="termin-slot-monthly" onClick={(e)=>{
                                    let h = e.target.innerHTML.split(".")[0]
                                    let m = e.target.innerHTML.split(".")[1]
                                    let copy = {...selected}
                                    copy.hourValue = h
                                    copy.minuteValue = m
                                    setSelected(selected => copy)
                                }}>
                                    {terminslot.startDate.getHours()}.{("0"+terminslot.startDate.getMinutes()).slice(-2)}
                                </div>
                            )
                        }
                        })}
            </div>
        )
    }else{
        return(
            <div className="termin-slot-container-monthly">
                <div className='calendar-day-monthly-empty'>Keine verfügbaren Termine</div>
            </div>
        )
    }
    
}
export default TerminSlotContainer;