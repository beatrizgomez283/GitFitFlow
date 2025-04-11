import { workouts } from '../data/workouts.js';
import { showDays } from './render-day-list.js';

const workoutListDiv = document.getElementById('workout-list');

// Mostrar la lista de entrenamientos
function showWorkouts() {
  workoutListDiv.innerHTML = "<h2>Selecciona un Workout</h2>";

  workouts.forEach((workout, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = workout.name;
    div.onclick = () => showDays(i);
    workoutListDiv.appendChild(div);
  });

  workoutListDiv.classList.remove("hidden");
}

showWorkouts();
