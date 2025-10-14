/**
 * Task 1: Modify the Mock Data
 * Add 2 more routes with different ETAs and stops. This helps you understand the data structure.
 * Task 2: Add a "Clear Search" Button
 * Add a button that appears when query is not empty, and clears it when clicked.
 * Task 3: Add a "Show Favorites Only" Toggle
 * Add a checkbox that filters to show only favorited routes.
 * Task 4: Display Route Count
 * Show "Showing X routes" above the grid (accounting for filters).
 */
import React, { useEffect, useState } from "react";
import { mockRoutes, fetchRoutes } from "./mockRoutes";

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
     // TODO: Call fetchRoutes()
     // TODO: Handle the promise (.then and .catch)
     // TODO: Update routes state on success
     // TODO: Update error state on failure
    fetchRoutes()
      .then(data => setRoutes(data)) // set routes on success
      .catch(err => setError(err.message)); // set error message on failure
  }, []); // empty dependency array means this runs once on mount

  useEffect(() => {
    localStorage.setItem("favRoutes", JSON.stringify(favorites));
  }, [favorites]);

  // If error exists -> show error message
   // If routes is null -> show "Loading routes..."
   // Otherwise -> show main UI
  if (error) return <div role="alert">Error: {error}</div>;
  if (!routes) return <div>Loading routes…</div>;

  // TODO: filter and sort routes based on query and sortBy
  const displayed = routes ? routes.filter(route => {
    // TODO: Convert query to lowercase
    // TODO: check if route.name includes the query
    // TODO: check if ANY stop includes the query (hint: use .some())
    // TODO: return true if either matches
    const lowerQuery = query.toLowerCase(); // convert query to lowercase
    const nameMatch = route.name.toLowerCase().includes(lowerQuery); // check if route.name includes the query
    const stopsMatch = route.stops.some(stop => stop.toLowerCase().includes(lowerQuery)); // check if any stop includes the query
    return nameMatch || stopsMatch; // return true if either matches
  })
    // for sorting...
    // TODO: Check if sortBy === "time"
    // TODO: if time, return a.etaMinutes - b.etaMinutes
    // TODO: if name, return a.name.localeCompare(b.name)
  .sort((a, b) => {
    if(sortBy === "time") {
      return a.etaMinutes - b.etaMinutes;
    } else {
      return a.name.localeCompare(b.name);
    }
  })

  : [];

  // create the favourites part
  function toggleFavorite(id) {
    // TODO: check if id is in prev array
    // TODO: if yes, remove it (use .filter())
    // TODO: if no, add it (use spread [...prev, id])
    // TODO: return the new array
    setFavourites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map(route => (
              <article key={route.id} className={`card ${favorites.includes(route.id) ? "fav" : ""}`}>
                <h2 className="... break-words">{route.name}</h2>
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
