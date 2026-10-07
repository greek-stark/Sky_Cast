import React from "react";

export function Loading({ text = "Loading weather..." }) {
  return <div className="state-card"><div className="spinner" />{text}</div>;
}

export function ErrorBox({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="error-box">
      <strong>Weather request failed</strong>
      <span>{message}</span>
      {onClose && <button onClick={onClose}>×</button>}
    </div>
  );
}

export function WeatherIcon({ icon, size = 96 }) {
  if (!icon) return null;
  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="Weather"
      width={size}
      height={size}
    />
  );
}
