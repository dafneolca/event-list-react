import React from 'react';
import './Dates.css'

const dates = (props) => {

  // Convert Date Format
  let date = new Date(props.date);
  let options = { weekday: 'long', day: 'numeric', month: 'long' };
  let dateTimeFormat = new Intl.DateTimeFormat(undefined, options);
  let newDateFormat = dateTimeFormat.format(date);

  return (
    <div className="Date">
      <p>{newDateFormat}</p>
    </div>
  )
}

export default dates;
