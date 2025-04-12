import { workouts } from '../data/workouts.js';

document.addEventListener('DOMContentLoaded', () => {
  const workoutListDiv = document.getElementById('workout-list');

  workouts.forEach((workout, workoutIndex) => {
    const workoutItem = document.createElement('div');
    workoutItem.className = 'card'; // Usa clase card para que sea un rectángulo blanco
    workoutItem.innerHTML = `<h3>${workout.name}</h3>`;

    const dayList = document.createElement('ul');

    workout.days.forEach((day, dayIndex) => {
      const dayItem = document.createElement('li');
      dayItem.innerHTML = `
        <a class="day-link" href="day-list.html?workoutIndex=${workoutIndex}&dayIndex=${dayIndex}">
          ${day.name}
        </a>
      `;
      dayList.appendChild(dayItem);
    });

    workoutItem.appendChild(dayList);
    workoutListDiv.appendChild(workoutItem);
  });
});
