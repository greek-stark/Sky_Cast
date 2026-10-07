import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  ["/", "Home"],
  ["/forecast", "Forecast"],
  ["/details", "Details"],
  ["/map", "Map"],
  ["/alerts", "Alerts"]
];

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand">Weather<span>IQ</span></NavLink>
        <div className="nav-links">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
