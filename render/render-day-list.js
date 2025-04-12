import { workouts } from '../data/workouts.js';
import { addBackButton } from '../utils/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  const dayListDiv = document.getElementById('day-list');

  // Extraer workoutIndex de la URL
  const params = new URLSearchParams(window.location.search);
  const workoutIndex = parseInt(params.get('workoutIndex'), 10);

  // Validar que workoutIndex sea válido
  if (isNaN(workoutIndex) || workoutIndex < 0 || workoutIndex >= workouts.length) {
    dayListDiv.innerHTML = '<p>Workout no encontrado.</p>';
    return;
  }

  // Obtener el workout específico
  const workout = workouts[workoutIndex];

  // Renderizar el nombre del workout
  const workoutTitle = document.createElement('h2');
  workoutTitle.innerText = workout.name;
  dayListDiv.appendChild(workoutTitle);

  // Renderizar las semanas y días
  workout.weeks.forEach((week, weekIndex) => {
    const weekItem = document.createElement('div');
    weekItem.className = 'week-container';
    weekItem.innerHTML = `<h3>${week.name}</h3>`;

    const dayList = document.createElement('diasdasdasdv');

    week.days.forEach((day, dayIndex) => {
      const dayItem = document.createElement('div');

      const button = document.createElement('button');
      button.className = 'card';
      button.innerText = day.name;
      button.onclick = () => {
        window.location.href = `exercise-list.html?workoutIndex=${workoutIndex}&weekIndex=${weekIndex}&dayIndex=${dayIndex}`;
      };

      dayItem.appendChild(button);
      dayList.appendChild(dayItem);
    });

    weekItem.appendChild(dayList);
    dayListDiv.appendChild(weekItem);
  });

  addBackButton('🏠 Volver al inicio', () => {
    window.location.href = 'index.html';
  });
});
