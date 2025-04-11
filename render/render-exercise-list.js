import { workouts } from '../data/workouts.js';
import { showResultsSummary } from './render-history.js';
import { addBackButton } from '../utils/navigation.js';

const exerciseListDiv = document.getElementById('exercise-list');

// Mostrar ejercicios de un día
export function showExercises(workoutIndex, dayIndex) {
  const day = workouts[workoutIndex].days[dayIndex];

  exerciseListDiv.innerHTML = `<h2>${day.name}</h2><h3>Ejercicios</h3>`;

  const historyBtn = document.createElement("button");
  historyBtn.innerText = "Ver Historial de Resultados";
  historyBtn.onclick = () => showResultsSummary(workoutIndex, dayIndex);
  exerciseListDiv.appendChild(historyBtn);

  day.exercises.forEach(ex => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${ex.name}</strong><br>Sets: ${ex.sets} - Objetivo: ${ex.target} ${ex.type === "reps" ? "reps" : "segundos"}`;
    exerciseListDiv.appendChild(div);
  });

  addBackButton("🏠 Volver a días de entrenamiento", () => window.location.href = "day-list.html");

  exerciseListDiv.classList.remove("hidden");
}
