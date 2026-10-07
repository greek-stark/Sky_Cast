import React, { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { ErrorBox, Loading, WeatherIcon } from "../components/Status";

const STORAGE = "weatheriq-favorites";

export default function WeatherMap() {
  const { weather, loading, error, clearError, loadCity } = useWeather();
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE) || "[]");
      setFavorites(Array.isArray(saved) ? saved : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = () => {
    const name = search.trim();
    if (name && !favorites.includes(name)) {
      setFavorites(prev => [...prev, name]);
      loadCity(name);
      setSearch("");
    }
  };

  const removeFavorite = (name) => {
    setFavorites(prev => prev.filter(x => x !== name));
  };

  return (
    <div className="page">
      <div className="page-title">
        <p className="eyebrow">CITY MAP / FAVORITES</p>
        <h1>Weather Map</h1>
        <p className="lead">Search cities and save your favorite locations.</p>
      </div>
      <ErrorBox message={error} onClose={clearError} />

      <div className="panel">
        <div className="search">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="City to add..." />
          <button onClick={addFavorite} disabled={loading}>Add city</button>
        </div>
      </div>

      {loading && !weather ? <Loading /> : weather && (
        <section className="weather-card">
          <div>
            <p className="muted">SELECTED CITY</p>
            <h2>{weather.name}</h2>
            <div className="big-temp">{Math.round(weather.main.temp)}°C</div>
            <p className="condition">{weather.weather?.[0]?.description}</p>
          </div>
          <WeatherIcon icon={weather.weather?.[0]?.icon} size={120} />
        </section>
      )}

      <section className="panel">
        <h2>Favorite cities</h2>
        {favorites.length === 0 ? <p className="muted">No favorites yet.</p> : (
          <div className="favorite-list">
            {favorites.map(name => (
              <div className="favorite" key={name}>
                <button onClick={() => loadCity(name)}>{name}</button>
                <button className="danger" onClick={() => removeFavorite(name)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
