import React, { useState, useEffect } from "react";
import axios from 'axios';
import windspd from "./assets/windspd.png";
import humidity from "./assets/humidity.png";
import clear from "./assets/cleary.gif";
import rain from "./assets/rainy.gif";
import snow from "./assets/snowy.gif";
import gif from "./assets/gifgif.gif";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Tbilisi");

  let myimg = gif;
  if (data.weather) {
    if (data.weather[0].main == "Clear") {
      myimg = clear;
    } else if (data.weather[0].main == "Rain") {
      myimg = rain;
    } else {
      myimg = snow;
    }
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c73986543f4485fa7a8de8ea178ba006&units=metric`;

  // useEffect(() => {
  //   axios.get(url).then((response) => {
  //     setData(response.data)
  //   })
  //   setLocation("")
  // }, []);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation("")
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios.get(url).then((response) => {
      setData(response.data)
    })
    setLocation("")
  };

  return (
    <>
      <div className='myimageTag' >
        <img src={`${myimg}`} />
      </div>
      <div className="App">
        <div className="search">
          <input className="myinput" type="text"
            value={location}
            placeholder="შეიყვანეთ ადგილი"
            onKeyDown={searchLocation}
            onChange={event => setLocation(event.target.value)}
          />
          <button className="mybutton" type="submit" onClick={handleClick}>ძებნა</button>
        </div>
        <div className="info">
          <div className="location">
            {data.name ? <h3>ადგილმდებარეობა {data.name}</h3> : null}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
        </div>
        <div className="more_info">
          <div className="humidity">
            {data.main ? <h4> <img className="humspd" src={`${humidity}`} /> ტენიანობა {data.main.humidity}%</h4> : null}
          </div>
          <div className="wind">
            {data.main ? <h4><img className="humspd" src={`${windspd}`} /> ქარის სიჩქარე {data.wind.speed.toFixed()} KM/H</h4> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
