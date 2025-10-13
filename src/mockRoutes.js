export const mockRoutes = [
  {
    id: 1,
    name: "Red Line Express",
    stops: ["Downtown", "Union Station", "Riverfront"],
    etaMinutes: 24,
  },
  {
    id: 2,
    name: "Green Local",
    stops: ["Parkside", "University", "Old Mill"],
    etaMinutes: 37,
  },
  {
    id: 3,
    name: "Blue Crosstown",
    stops: ["Airport", "Midtown", "Harbor"],
    etaMinutes: 19,
  },
];

export function fetchRoutes() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockRoutes);
        }, 500);
    });
}
