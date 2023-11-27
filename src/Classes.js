/**
 * Classes.js contains help-methods and class-definitions:
 *  eg. Termin, TimeSlot, Event-Classes
 *  eg. Methods to compare to timeslots for overlapping or similar
 */


export class Termin{
    constructor(h, m, date, leistung, dauer, kunde){
      this.hourValue = h;
      this.minuteValue= m;
      this.date = date;
      this.leistung = leistung;
      this.dauer = dauer;
      this.kunde = kunde;
    }
  }
  export class TerminSlot{
    constructor(startDate, endDate){
      this.startDate = startDate;
      this.endDate = endDate;
    }
  }
  
  export class Kunde{
    constructor(anrede, vorname, nachname, mail, phone){
      this.anrede = anrede;
      this.vorname=vorname;
      this.nachname=nachname;
      this.mail=mail;
      this.phone=phone;
    }
  }
  export class Event{
    constructor(title, bio, date, h, m, spots, dauer, participants){
      this.title = title;
      this.bio = bio;
      this.date=date;
      this.hourValue=h;
      this.minuteValue=m;
      this.spots=spots;
      this.dauer = dauer;
      this.participants=participants;
    }
  }
  export function taken(datestr, ts, termine){
    for(let i = 0; i<termine.length;i++){
         if(termine[i].date == datestr){
            let tslot = getTerminSlot(termine[i]);
            console.log(ts)
            console.log(tslot)
            console.log(noOverlap(ts, tslot))
            if(!noOverlap(ts, tslot)){
                return true;
             }
         }
    } 
    return false;
 }
 export function getDateString(date){
     return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
 }
 export function getTerminSlot(termin){
     let d = termin.date.split(".")
     return new TerminSlot(new Date(d[2], d[1]-1, d[0], termin.hourValue, termin.minuteValue), 
             new Date(new Date(d[2], d[1]-1, d[0], termin.hourValue, termin.minuteValue).getTime()+termin.dauer*15*60*1000))
 }
 export function getEventSlot(termin){
  let d = termin.date.split(".")
  return new TerminSlot(new Date(d[2], d[1]-1, d[0], termin.hourValue, termin.minuteValue), 
          new Date(new Date(d[2], d[1]-1, d[0], termin.hourValue, termin.minuteValue).getTime()+termin.dauer*60*1000))
}
 export function within(ts1, ts2){//checks if ts1 is contained in ts2
     return (ts1.startDate>=ts2.startDate && ts1.endDate<=ts2.endDate);
 }
 export function tsBefore(ts1, ts2){ //checks if ts1 lies before ts2 completely
     return (ts1.endDate<=ts2.startDate);
 }
 export function tsAfter(ts1, ts2){//checks if ts1 lies completely after ts2
     return (ts2.endDate<=ts1.startDate);
 }
 export function noOverlap(ts1, ts2){//checks two timeslots for overlaps
     //entweder liegt ts1 komplett vor ts2 oder danach
     return (tsBefore(ts1, ts2)||tsAfter(ts1, ts2));
 }
 export function getDatefromDatestring(str, h, m){
  let a = str.split(".")
  return new Date(a[2], a[1]-1, a[0], h, m)
}
export function getMonday(date){
  let dayIndex= date.getDay()==0? 6: date.getDay()-1;
  return new Date(date.getTime() - dayIndex*24*60*60*1000);
}
export function getEventDayArray(startDate, endDate, stepSize){//stepSize in minuten
  let a = []
  while(startDate<endDate){
    a.push(new TerminSlot(startDate, new Date(startDate.getTime()+1000*60*stepSize)))
    startDate= new Date(startDate.getTime()+1000*60*stepSize)
  }
  return a
}
export function noEvent(events, ts){
  let noevent=true;
  events.forEach(ev=>{
    if(!noOverlap(getEventSlot(ev), ts)){
      noevent=false;
    }
  })
  return noevent;
}
export function startsEvent(events, ts){
  for(let i = 0;i<events.length;i++){
    if(events[i].date==getDateString(ts.startDate)){
      if(events[i].hourValue==ts.startDate.getHours()&&events[i].minuteValue == ts.startDate.getMinutes()){
        return events[i];
      }
    }
  }
  return false;
}
export function calculateWeek(date){//returns a String with the current weekDates
  let monday = getMonday(date);
  let friday = new Date(monday.getTime()+5*24*60*60*1000);
  return `Mo: ${monday.getDate()}.${monday.getMonth()+1}.${monday.getFullYear()}- Fr: ${friday.getDate()}.${friday.getMonth()+1}.${friday.getFullYear()}`;
}
export function getTimeSlotArray(index, bh, date, granularity){//takes the index of the weekday as a parameter
  if(index>4){return []}
  let timeSlotArray = []
  bh[index].forEach(timeslot =>{
      let begin = timeslot.split("-")[0]
      let end = timeslot.split("-")[1]
      if(timeslot == "-"){
      }else{
          let monday = getMonday(date)
         let counterDate = new Date(monday.getFullYear(),monday.getMonth(), monday.getDate()+index, begin.split(".")[0], begin.split(".")[1])
         let endDate = new Date(monday.getFullYear(),monday.getMonth(), monday.getDate()+index, end.split(".")[0], end.split(".")[1])
         while(counterDate<endDate){
              timeSlotArray.push(new TerminSlot(counterDate, new Date(counterDate.getTime()+granularity*60*1000)))
              counterDate = new Date(counterDate.getTime()+granularity*60*1000)
         }
      }
  })
  return timeSlotArray;
}
export function getFirstOfMonth(date){
  return new Date(date.getFullYear(), date.getMonth(), 1)
}
export function getLastOfMonth(date){
  return new Date(date.getFullYear(), date.getMonth()+1, 0)
}
export function getMonthArray(date){
  let month = date.getMonth()
  let first=getFirstOfMonth(date)
  let dayIndex = first.getDay()==0?6:first.getDay()-1
  let array=[first]
  let nextMonday = new Date(first.getTime()+ (7-dayIndex)*24*3600000)
  while(nextMonday.getMonth()==month){
      array.push(nextMonday)
      if(new Date(nextMonday.getTime()+ 7*24*3600000).getDay()==1){
          nextMonday = new Date(nextMonday.getTime()+ 7*24*3600000)
      }else{
          nextMonday = new Date(nextMonday.getTime()+ 7*25*3600000)
      }
  }
  return array
}
export function getWeekArray(startdate, dayIndex){
  let ar = []
  let counter = 0
  for(let i = dayIndex;i<6;i++){
      let date= new Date(startdate.getTime()+counter*24*3600000)
      if(date.getMonth()==startdate.getMonth()){
          ar.push(date.getDate())
      }
      counter++
  }
  return ar;
}
export function showEvent(id, opened){
  if(opened != ""){
      document.getElementById(opened).style.display="none"
  }
  let modalId= id.split("-")[0]
  let modal = document.getElementById(modalId)
  modal.style.display = "flex";
  opened = modalId
  return modalId
}
export function getEventArray(datestr, events){
  let a = []
  events.forEach(ev=>{
      if(datestr==ev.date){
          a.push(ev)
      }
  })
  return a
}

