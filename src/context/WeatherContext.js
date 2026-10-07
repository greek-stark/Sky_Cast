import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const WeatherContext = createContext(null);
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

async function requestJson(url) {
  const response = await fetch(url);
  let data = null;
  try {
    data = await response.json();
  } catch {
    throw new Error("Weather service returned an invalid response.");
  }
  if (!response.ok) {
    throw new Error(data?.message || "Unable to load weather data.");
  }
  return data;
}

async function getWeatherBundle(city) {
  const name = String(city || "").trim();
  if (!name) throw new Error("Please enter a city name.");
  if (!API_KEY) {
    throw new Error("API key missing. Create .env and set REACT_APP_WEATHER_API_KEY.");
  }

  const q = encodeURIComponent(name);
  const base = "https://api.openweathermap.org/data/2.5";
  const query = `?q=${q}&appid=${API_KEY}&units=metric`;

  const [weather, forecast] = await Promise.all([
    requestJson(`${base}/weather${query}`),
    requestJson(`${base}/forecast${query}`)
  ]);

  return { weather, forecast };
}

export function WeatherProvider({ children }) {
  const [city, setCity] = useState("Chennai");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCity = useCallback(async (cityName) => {
    try {
      setLoading(true);
      setError("");
      const result = await getWeatherBundle(cityName);
      setWeather(result.weather);
      setForecast(result.forecast);
      setCity(result.weather.name);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load weather.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCity("Chennai");
  }, [loadCity]);

  const clearError = useCallback(() => setError(""), []);

  const value = useMemo(
    () => ({ city, weather, forecast, loading, error, loadCity, clearError }),
    [city, weather, forecast, loading, error, loadCity, clearError]
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

export function useWeather() {
  const value = useContext(WeatherContext);
  if (!value) throw new Error("useWeather must be used inside WeatherProvider");
  return value;
}
