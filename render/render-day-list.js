import { workouts } from '../data/workouts.js';
import { showExercises } from './render-exercise-list.js';
import { addBackButton } from '../utils/navigation.js';

const dayListDiv = document.getElementById('day-list');

// Mostrar los días del entrenamiento seleccionado
export function showDays(workoutIndex) {
  const workout = workouts[workoutIndex];
  
  dayListDiv.innerHTML = `<h2>${workout.name}</h2><h3>Selecciona un día</h3>`;
  
  workout.days.forEach((d, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = d.name;
    div.onclick = () => showExercises(workoutIndex, i);
    dayListDiv.appendChild(div);
  });

  addBackButton("🏠 Volver a workouts", () => window.location.href = "index.html");

  dayListDiv.classList.remove("hidden");
}
