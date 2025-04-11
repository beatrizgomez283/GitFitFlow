import { workouts } from '../data/workouts.js';
import { addBackButton } from '../utils/navigation.js';

const exerciseListDiv = document.getElementById('history-list');

// Mostrar historial de entrenamientos
export function showResultsSummary(workoutIndex, dayIndex) {
  const workout = workouts[workoutIndex];
  const day = workout.days[dayIndex];

  exerciseListDiv.innerHTML = `<h2>Historial de Entrenamientos - ${workout.name} - ${day.name}</h2>`;

  const historyKey = `history_${workout.name}_${day.name}`;
  const history = JSON.parse(localStorage.getItem(historyKey)) || [];

  if (history.length === 0) {
    exerciseListDiv.innerHTML += "<p>No hay historial de entrenamientos.</p>";
  } else {
    history.forEach(item => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<strong>${item.date}</strong><br>`;

      item.results.forEach(ex => {
        div.innerHTML += `<strong>${ex.name}</strong><br>`;
        ex.sets.forEach((set, i) => {
          div.innerHTML += `Set ${i + 1}: ${set.reps || set.segundos} reps - ${set.weight} kg<br>`;
        });
      });

      exerciseListDiv.appendChild(div);
    });
  }

  addBackButton("🏠 Volver a días de entrenamiento", () => window.location.href = "day-list.html");

  exerciseListDiv.classList.remove("hidden");
}
