import React, { useEffect, useRef, useState }from 'react'
import ReactDOM from 'react-dom'
import MapComponent from './map_component'
import './styles.css'
import Moment from 'moment'

const Index = () => {
    const [time, setTime] = React.useState('');
    const min = Moment("2019-05-30T22:36:54.000Z").toString();
    const max = Moment("2019-05-30T23:17:03.178Z").toString();
    const step = 1;
    const onChange = event =>  setTime(Moment("2019-05-30T22:36:54.000Z").add(event.target.value,'minutes').format("YYYY-MM-DDTHH:mm:ss.SSS"));
    return (
    <div>
      <div className='header'>
        <h1>Welcome to the example task!</h1>
      </div>
      {/* TODO(Task 2): Add a slider to select datetime in the past.
        Pass the selected value as prop to the MapContainer */ }
        <p> Select time between {min}  and {max} </p>
<input type="range" min= "0"  max= "41"  step="1"  onChange={onChange} />
        <p> Selected value: {time} </p>
      <MapComponent time={time} />
    </div>)
}

ReactDOM.render(<Index />, document.getElementById('main-container'))
