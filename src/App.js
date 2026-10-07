import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import Details from "./pages/Details";
import WeatherMap from "./pages/WeatherMap";
import Alerts from "./pages/Alerts";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/details" element={<Details />} />
            <Route path="/map" element={<WeatherMap />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
