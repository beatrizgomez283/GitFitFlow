
// index.js
import { workouts } from './data/workouts.js';  // Asegúrate de tener la ruta correcta

document.addEventListener('DOMContentLoaded', () => {
  const workoutListDiv = document.getElementById('workout-list');

  // Iterar sobre los workouts y agregar los enlaces correspondientes a la lista
  workouts.forEach((workout, workoutIndex) => {
    const workoutItem = document.createElement('div');
    workoutItem.className = 'workout-item';
    workoutItem.innerHTML = `<h3>${workout.name}</h3>`;

    const dayList = document.createElement('ul');
    
    // Iterar sobre los días de cada workout
    workout.days.forEach((day, dayIndex) => {
      const dayItem = document.createElement('li');
      dayItem.innerHTML = `<a href="history-list.html?workout=${workoutIndex}&day=${dayIndex}">${day.name}</a>`;
      dayList.appendChild(dayItem);
    });

    workoutItem.appendChild(dayList);
    workoutListDiv.appendChild(workoutItem);
  });
});
