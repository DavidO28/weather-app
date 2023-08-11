import React, { useState } from "react";
import axios from 'axios';
import video from './assets/myvideo.mp4';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c73986543f4485fa7a8de8ea178ba006&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation("")
    }
  };

  return (
    <>
      <video className='videoTag' autoPlay loop muted>
        <source src={video} type='video/mp4' />
      </video>
      <div className="App">
        <div className="search">
          <input type="text"
            value={location}
            placeholder="შეიყვანეთ ადგილი"
            onKeyDown={searchLocation}
            onChange={event => setLocation(event.target.value)}
          />

        </div>
        <div className="info">
          <div className="location">
            {data.name ? <h3>ადგილმდებარეობა {data.name}</h3> : null}
          </div>
          <div className="temp">
            {data.main ? <h1>ტემპერატურა {data.main.temp.toFixed()}°C</h1> : null}
          </div>
        </div>
        <div className="more_info">
          <div className="humidity">
            {data.main ? <h4>ტენიანობა {data.main.humidity}%</h4> : null}
          </div>
          <div className="wind">
            {data.main ? <h4>ქარის სიჩქარე {data.wind.speed.toFixed()} KM/H</h4> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
