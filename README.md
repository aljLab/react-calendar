# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

####Calendar in React####

##Functionalities##

The calendar displays days, weeks or months per page. 

It either displays **appointments** (represented by the `Termin`-Class) or **events** (`Event`-Class).

**Events** have a `title`, description (`bio`), `date`, time (`hourValue`and `minuteValue`), a `dauer` and a list of `participants`.
**Appointments** (Termine) have a `date`, starthour (`hourValue`) and startminute (`minuteValue`), a duration (`dauer`), a `Leistung` and a customer (`Kunde`).

> Appointments can be booked from the calendar in *appointment-mode*. 
> Per day free timeslots are displayed, which are not occupied by
> another appointment at that time. 

This calendar app is structured as follows: 
The ***<App>-Component*** provides the context information. A `conf` object is used to pass configuration details to the calendar components via ReactContext.
It renders on the condition of `conf.calendarType` and displays either a `DayCalendar`, `WeekCalendar` or `MonthCalendar`.

These components render on the condition of `conf.showEvents` either to show  *appointments* or *events*. 
All three components return a combination of components: a **Navigationbar**, a **CalendarSettings**, a **CalendarLeistung** specific components to each `calendarType`.

>**CalendarLeistung** requires the user to select a service before displaying 
> the selectable time slots (which are represented by the Class `TerminSlot`)

The **MonthCalendar** is split up into individual row component (`CalendarRow`). In addition the monthly version of the calendar has a display to show avalaible time slots or *events* (`MonthlyEventDisplay`)on a selected date in the calendar.

