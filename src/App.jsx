// App.jsx
import React, { useEffect, useState } from "react";

// SAMPLE DATA: use if network is not available or you want to demo quickly
const SAMPLE_ROUTES = [
  { id: 1, name: "Red Line Express", stops: ["Downtown", "Union Station", "Riverfront"], etaMinutes: 24 },
  { id: 2, name: "Green Local", stops: ["Parkside", "University", "Old Mill"], etaMinutes: 37 },
  { id: 3, name: "Blue Crosstown", stops: ["Airport", "Midtown", "Harbor"], etaMinutes: 19 },
];

function fetchRoutes() {
  // In an interview you can mock this:
  return fetch("/api/routes").then(res => {
    if (!res.ok) throw new Error("Network error");
    return res.json();
  });
}

export default function App() {
  const [routes, setRoutes] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("time"); // or "name"
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favRoutes") || "[]"); 
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetchRoutes()
      .then(data => setRoutes(data))
      .catch(err => setError(err.message));
  }, []);

  useEffect(() => {
    localStorage.setItem("favRoutes", JSON.stringify(favorites));
  }, [favorites]);

  if (error) return <div role="alert">Error: {error}</div>;
  if (!routes) return <div>Loading routes…</div>;
0
  // TODO: filter and sort routes based on query and sortBy
  // Sort: add a control to sort routes by estimated travel time (ascending) or by
  // name (alphabetically)
  // Filter: add a search input to filter routes by name or stop (case insensitive)

  // Filtering=
  const normalizedQuery = query.trim().toLowerCase();
  const displayed = 

  function toggleFavorite(id) {
    // TODO: add/remove id in favorites
  }

  return (
    <div className="app">
      <header>
        <h1>Route Explorer</h1>
        <label>
          Search
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search routes by name or stop"
          />
        </label>

        <label>
          Sort
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="time">By ETA (fastest)</option>
            <option value="name">By name</option>
          </select>
        </label>
      </header>

      <main>
        {displayed.length === 0 ? (
          <p>No routes match your search.</p>
        ) : (
          <div className="grid">
            {displayed.map(route => (
              <article key={route.id} className={`card ${favorites.includes(route.id) ? "fav" : ""}`}>
                <h2>{route.name}</h2>
                <p>Stops: {route.stops.join(", ")}</p>
                <p>ETA: {route.etaMinutes} min</p>
                <button
                  aria-pressed={favorites.includes(route.id)}
                  onClick={() => toggleFavorite(route.id)}
                >
                  {favorites.includes(route.id) ? "Unfavorite" : "Favorite"}
                </button>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
