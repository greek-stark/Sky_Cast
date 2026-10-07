import React, { useMemo } from "react";
import { useWeather } from "../context/WeatherContext";
import { ErrorBox, Loading } from "../components/Status";

function makeAlerts(weather) {
  if (!weather) return [];
  const a = [];
  const id = weather.weather?.[0]?.id || 0;
  const temp = weather.main?.temp;
  const wind = weather.wind?.speed;
  const visibility = weather.visibility;
  const humidity = weather.main?.humidity;

  if (id >= 200 && id < 300) a.push(["Critical", "⛈️", "Thunderstorm", "Stay indoors and avoid exposed areas."]);
  if (id >= 500 && id < 600) a.push(["Moderate", "🌧️", "Rain advisory", "Carry rain protection and travel carefully."]);
  if (id >= 600 && id < 700) a.push(["High", "❄️", "Snow advisory", "Travel carefully and dress warmly."]);
  if (temp > 40) a.push(["Critical", "🔥", "Extreme heat", "Stay hydrated and avoid prolonged sun exposure."]);
  else if (temp > 35) a.push(["High", "🌡️", "Heat advisory", "Stay hydrated and limit direct sun exposure."]);
  if (temp < 0) a.push(["High", "🥶", "Freeze warning", "Protect exposed plants, pipes and equipment."]);
  else if (temp < 5) a.push(["Moderate", "🧣", "Cold advisory", "Dress warmly and limit prolonged exposure."]);
  if (wind >= 20) a.push(["Critical", "🌪️", "High wind warning", "Secure loose objects and avoid unnecessary travel."]);
  else if (wind >= 15) a.push(["High", "💨", "Wind advisory", "Secure outdoor objects and use caution."]);
  if (visibility < 1000) a.push(["High", "🌫️", "Dense fog advisory", "Use headlights and drive with extreme caution."]);
  else if (visibility < 3000) a.push(["Moderate", "🌫️", "Low visibility", "Use additional caution while driving."]);
  if (humidity >= 90 && temp >= 25) a.push(["Low", "💧", "High humidity", "Stay hydrated and take breaks in cool areas."]);

  return a;
}

export default function Alerts() {
  const { city, weather, loading, error, clearError } = useWeather();
  const alerts = useMemo(() => makeAlerts(weather), [weather]);

  if (loading && !weather) return <div className="page"><Loading /></div>;

  return (
    <div className="page">
      <div className="page-title">
        <p className="eyebrow">SAFETY MONITORING</p>
        <h1>Weather Alerts</h1>
        <p className="lead">Automatically generated from current conditions for {city}.</p>
      </div>
      <ErrorBox message={error} onClose={clearError} />
      <div className="summary">
        <div><span>Total</span><strong>{alerts.length}</strong></div>
        <div><span>Critical</span><strong>{alerts.filter(x => x[0] === "Critical").length}</strong></div>
        <div><span>High</span><strong>{alerts.filter(x => x[0] === "High").length}</strong></div>
        <div><span>Moderate</span><strong>{alerts.filter(x => x[0] === "Moderate").length}</strong></div>
      </div>

      {alerts.length === 0 ? (
        <div className="success-card">✓ No automatic weather alerts are currently detected.</div>
      ) : (
        <div className="alert-grid">
          {alerts.map(([severity, icon, title, description]) => (
            <article className={`alert-card ${severity.toLowerCase()}`} key={`${title}-${severity}`}>
              <div className="alert-icon">{icon}</div>
              <div>
                <span className="badge">{severity}</span>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
