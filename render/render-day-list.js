import { workouts } from '../data/workouts.js';
import { showExercises } from './render-exercise-list.js';
import { addBackButton } from '../utils/navigation.js';

document.addEventListener('DOMContentLoaded', () => {

const dayListDiv = document.getElementById('day-list');

  workouts.forEach((workout, workoutIndex) => {
    const workoutItem = document.createElement('div');
    workoutItem.innerHTML = `<h3>${workout.name}</h3>`;

    const dayList = document.createElement('ul');

    workout.days.forEach((day, dayIndex) => {
    const dayItem = document.createElement('li');
    dayItem.className = 'card'; // Usa clase card para que sea un rectángulo blanco

    dayItem.innerHTML = 
        `<a className=href="day-list.html?
        workoutIndex=${workoutIndex}&dayIndex=${dayIndex}">${day.name}
        </a>
      `;
      dayList.appendChild(dayItem);
    });

    workoutItem.appendChild(dayList);
    workoutListDiv.appendChild(workoutItem);
  });
});





