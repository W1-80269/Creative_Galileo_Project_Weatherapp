import axios from "axios";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false, 
  });

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setInput("");
      setWeather({ ...weather, loading: true });
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const api_key = "a7a23b613475e364c056d4d98fd78f76";
      await axios
        .get(url, {
          params: {
            q: input,
            units: "metric",
            appid: api_key,
          },
        })
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput("");
          console.log("error", error);
        });
    }
  };

  return (
    <>
      <div className="App">
        <h1 className="app-name">Weather in</h1>
        <div className="search-bar">
          <input
            type="text"
            className="city-search"
            placeholder="Enter City Name.."
            name="query"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyPress={search}
          />
        </div>
        {weather.loading && (
          <>
            <br />
            <br />
            
          </>
        )}
        {weather.error && (
          <>
            <br />
            <br />
            <span className="error-message">
             
              <span style={{ fontSize: "20px" }}>City not found</span>
            </span>
          </>
        )}
        {weather && weather.data && weather.data.main && (
          <div className="weather-card">
            <div className="city-name">
              <h2>
                {weather.data.name}, <span>{weather.data.sys.country}</span>
              </h2>
            </div>
            <div className="date">{/* <span>{toDateFunction()}</span> */}</div>
            <div className="icon-temp">
              <img
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt={weather.data.weather[0].description}
              />
              {Math.round(weather.data.main.temp)}
              <sup className="deg">°C</sup>
            </div>
            <div className="des-wind">
              <p>{weather.data.weather[0].description.toUpperCase()}</p>
              <p>Max: {weather.data.main.temp_max}°C</p>
              <p>Min: {weather.data.main.temp_min}°C</p>
              <p>Feels Like: {weather.data.main.feels_like}°C</p>
              <p>Humidity: {weather.data.main.humidity}%</p>
              <p>Wind Speed: {weather.data.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
  