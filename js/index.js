import { workouts } from '../data/workouts.js';

document.addEventListener('DOMContentLoaded', () => {
  const workoutListDiv = document.getElementById('workout-list');

  workouts.forEach((workout, workoutIndex) => {
    const workoutItem = document.createElement('li');
    workoutItem.className = 'card'; // Usa clase card para que sea un rectángulo blanco

    workoutItem.innerHTML = `
      <a href="day-list.html?workoutIndex=${workoutIndex}">
        ${workout.name}
      </a>
    `;

    workoutListDiv.appendChild(workoutItem);
  });
});
