import React, { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { ErrorBox, Loading, WeatherIcon } from "../components/Status";

export default function Home() {
  const { weather, loading, error, loadCity, clearError } = useWeather();
  const [search, setSearch] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      loadCity(search);
      setSearch("");
    }
  };

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">WEATHER INTELLIGENCE</p>
          <h1>Know your weather.<br /><span>Plan your day.</span></h1>
          <p className="lead">Live weather information, forecasts, details and safety alerts in one connected dashboard.</p>
          <form className="search" onSubmit={submit}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search any city..." />
            <button type="submit" disabled={loading}>Search</button>
          </form>
        </div>
      </section>

      <ErrorBox message={error} onClose={clearError} />
      {loading && !weather ? <Loading /> : weather ? (
        <section className="weather-card">
          <div>
            <p className="muted">CURRENT WEATHER</p>
            <h2>{weather.name}, {weather.sys?.country}</h2>
            <p className="condition">{weather.weather?.[0]?.description}</p>
            <div className="big-temp">{Math.round(weather.main.temp)}°C</div>
          </div>
          <WeatherIcon icon={weather.weather?.[0]?.icon} size={130} />
          <div className="metric-grid">
            <Metric label="Feels like" value={`${Math.round(weather.main.feels_like)}°C`} />
            <Metric label="Humidity" value={`${weather.main.humidity}%`} />
            <Metric label="Wind" value={`${weather.wind.speed} m/s`} />
            <Metric label="Pressure" value={`${weather.main.pressure} hPa`} />
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Metric({ label, value }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong></div>;
}
