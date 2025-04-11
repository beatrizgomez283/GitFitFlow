export function saveHistory(workoutName, dayName, data) {
  const key = `history_${workoutName}_${dayName}`;
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push(data);
  localStorage.setItem(key, JSON.stringify(existing));
}

export function getHistory(workoutName, dayName) {
  const key = `history_${workoutName}_${dayName}`;
  return JSON.parse(localStorage.getItem(key) || "[]");
}
