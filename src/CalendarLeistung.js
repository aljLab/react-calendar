function CalendarLeistung({selected, setSelected}){
    return(
        <div className="leistung-select-container" onChange={(e)=>{
                let copy = {...selected}
                copy.leistung = e.target.value
                setSelected(selected => copy)
            }}>
            <label htmlFor="leistungs-select">Bitte wählen Sie zuerst eine Leistung aus.</label>
            <select id="leistungs-select" value = {selected.leistung}>
                <option value="--">--</option>
                <option value="Massage (60 Minuten)">Massage (60 Minuten)</option>
                <option value="Beratung/Gespräch">Beratung/Gespräch</option>
                <option value="Telefontermin akut">Telefontermin akut</option>
            </select>
        </div>
    )
}

export default CalendarLeistung;