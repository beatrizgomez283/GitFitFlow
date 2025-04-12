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

        // Crear un botón con la clase "card"
        const button = document.createElement('button');
        button.className = 'card'; // Reutiliza la clase "card" para el estilo
        button.innerText = day.name;
        button.onclick = () => {
          window.location.href = `exercise-list.html?workoutIndex=${workoutIndex}&weekIndex=${weekIndex}&dayIndex=${dayIndex}`;
        };

        dayItem.appendChild(button);
        dayList.appendChild(dayItem);
      });

      weekItem.appendChild(dayList);
      weekList.appendChild(weekItem);
    });

    workoutItem.appendChild(weekList);
    dayListDiv.appendChild(workoutItem);
  });
});
