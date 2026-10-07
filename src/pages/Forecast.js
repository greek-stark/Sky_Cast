import React from "react";
import { useWeather } from "../context/WeatherContext";
import { ErrorBox, Loading, WeatherIcon } from "../components/Status";

function groupDays(list) {
  const groups = {};
  (list || []).forEach(item => {
    const key = new Date(item.dt * 1000).toLocaleDateString();
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return Object.entries(groups).slice(0, 5);
}

export default function Forecast() {
  const { city, forecast, loading, error, clearError } = useWeather();

  if (loading && !forecast) return <div className="page"><Loading /></div>;

  return (
    <div className="page">
      <div className="page-title">
        <p className="eyebrow">5-DAY FORECAST</p>
        <h1>{city} Forecast</h1>
        <p className="lead">Upcoming conditions from the OpenWeather forecast service.</p>
      </div>
      <ErrorBox message={error} onClose={clearError} />
      <div className="forecast-grid">
        {groupDays(forecast?.list).map(([date, items]) => {
          const temps = items.map(x => x.main?.temp).filter(Number.isFinite);
          const mid = items.find(x => new Date(x.dt * 1000).getHours() >= 12) || items[0];
          return (
            <article className="forecast-card" key={date}>
              <h3>{new Date(date).toLocaleDateString([], { weekday: "long" })}</h3>
              <p className="muted">{new Date(date).toLocaleDateString()}</p>
              <WeatherIcon icon={mid?.weather?.[0]?.icon} size={82} />
              <strong className="range">{Math.round(Math.min(...temps))}° / {Math.round(Math.max(...temps))}°</strong>
              <p className="condition">{mid?.weather?.[0]?.description || "No data"}</p>
              <p className="muted">Rain chance: {Math.round((mid?.pop || 0) * 100)}%</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
