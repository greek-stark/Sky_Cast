import React from "react";
import { useWeather } from "../context/WeatherContext";
import { ErrorBox, Loading, WeatherIcon } from "../components/Status";

export default function Details() {
  const { city, weather, forecast, loading, error, clearError } = useWeather();

  if (loading && !weather) return <div className="page"><Loading /></div>;

  const rows = [
    ["Temperature", weather?.main?.temp, "°C"],
    ["Feels like", weather?.main?.feels_like, "°C"],
    ["Humidity", weather?.main?.humidity, "%"],
    ["Pressure", weather?.main?.pressure, " hPa"],
    ["Wind speed", weather?.wind?.speed, " m/s"],
    ["Wind direction", weather?.wind?.deg, "°"],
    ["Visibility", weather?.visibility ? weather.visibility / 1000 : null, " km"],
    ["Cloud coverage", weather?.clouds?.all, "%"]
  ];

  return (
    <div className="page">
      <div className="page-title">
        <p className="eyebrow">WEATHER DETAILS</p>
        <h1>{city}</h1>
      </div>
      <ErrorBox message={error} onClose={clearError} />
      {weather && (
        <>
          <section className="details-hero">
            <div>
              <p className="muted">CURRENT CONDITION</p>
              <h2>{weather.weather?.[0]?.description}</h2>
              <div className="big-temp">{Math.round(weather.main.temp)}°C</div>
            </div>
            <WeatherIcon icon={weather.weather?.[0]?.icon} size={130} />
          </section>
          <section className="details-grid">
            {rows.map(([label, value, unit]) => (
              <div className="metric" key={label}>
                <span>{label}</span>
                <strong>{typeof value === "number" ? `${value % 1 ? value.toFixed(1) : value}${unit}` : "N/A"}</strong>
              </div>
            ))}
          </section>
          <section className="panel">
            <h2>Forecast summary</h2>
            <p className="muted">{forecast?.list?.length || 0} forecast intervals available for {city}.</p>
          </section>
        </>
      )}
    </div>
  );
}
