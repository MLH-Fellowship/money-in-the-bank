import React, {useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MonthPicker = ({date, setDate}) => {
    
    return (
        <DatePicker
        selected={date}
        onChange={date => setDate(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        />
    );
};

export default MonthPicker;