import { workouts } from '../data/workouts.js';
import { showExercises } from './render-exercise-list.js';
import { addBackButton } from '../utils/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  const dayListDiv = document.getElementById('day-list');

  workouts.forEach((workout, workoutIndex) => {
    const workoutItem = document.createElement('div');
    workoutItem.innerHTML = `<h3>${workout.name}</h3>`;

    const weekList = document.createElement('div');

    workout.weeks.forEach((week, weekIndex) => {
      const weekItem = document.createElement('div');
      weekItem.innerHTML = `<h4>${week.name}</h4>`;

      const dayList = document.createElement('ul');

      week.days.forEach((day, dayIndex) => {
        const dayItem = document.createElement('li');
        dayItem.className = 'card'; // Usa clase card para que sea un rectángulo blanco

        dayItem.innerHTML = `
          <a href="exercise-list.html?workoutIndex=${workoutIndex}&weekIndex=${weekIndex}&dayIndex=${dayIndex}">
            ${day.name}
          </a>
        `;
        dayList.appendChild(dayItem);
      });

      weekItem.appendChild(dayList);
      weekList.appendChild(weekItem);
    });

    workoutItem.appendChild(weekList);
    dayListDiv.appendChild(workoutItem);
  });
});
