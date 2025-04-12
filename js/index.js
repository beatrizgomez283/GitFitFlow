import { workouts } from '../data/workouts.js';

document.addEventListener('DOMContentLoaded', () => {
  const workoutListDiv = document.getElementById('workout-list');

  workouts.forEach((workout, workoutIndex) => {
    const workoutItem = document.createElement('div');
    workoutItem.innerHTML = `<h3>${workout.name}</h3>`;

    const workoutList = document.createElement('ul');

    workouts.forEach((workout, workoutIndex) => {
    const workoutItem = document.createElement('li');
    workoutItem.className = 'card'; // Usa clase card para que sea un rectángulo blanco

    workoutItem.innerHTML = 
        `<a className=href="day-list.html?
        workoutIndex=${workoutIndex}>${workout.name}
        </a>
      `;
      workoutList.appendChild(workoutItem);
    });

    workoutItem.appendChild(workoutList);
    workoutListDiv.appendChild(workoutItem);
  });
});
