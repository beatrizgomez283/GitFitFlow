import { workouts } from '../data/workouts.js';
import { addBackButton } from '../utils/navigation.js';

// Definir y exportar la función showExercises
export function showExercises(workoutIndex, dayIndex) {
  const workout = workouts[workoutIndex];
  const day = workout.weeks.flatMap(week => week.days)[dayIndex];

  const exerciseListDiv = document.getElementById('exercise-list');
  if (!exerciseListDiv) return;

  if (!day) {
    exerciseListDiv.innerHTML = '<p>No se encontraron ejercicios para este día.</p>';
    return;
  }

  // Renderizar el título del día
  exerciseListDiv.innerHTML = `<h2>${day.name}</h2><h3>Ejercicios</h3>`;

  // Renderizar los ejercicios
  day.exercises.forEach(exercise => {
    const exerciseItem = document.createElement('div');
    exerciseItem.className = 'card';
    exerciseItem.innerHTML = `
      <strong>${exercise.name}</strong><br>
      Sets: ${exercise.sets} - Objetivo: ${exercise.target} ${exercise.type === 'reps' ? 'reps' : 'segundos'}
    `;
    exerciseListDiv.appendChild(exerciseItem);
  });

  // Agregar un botón de regreso
  addBackButton('🏠 Volver a días de entrenamiento', () => {
    window.location.href = `day-list.html?workoutIndex=${workoutIndex}`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const workoutIndex = parseInt(params.get('workoutIndex'), 10);
  const weekIndex = parseInt(params.get('weekIndex'), 10);
  const dayIndex = parseInt(params.get('dayIndex'), 10);

  if (!isNaN(workoutIndex) && !isNaN(weekIndex) && !isNaN(dayIndex)) {
    showExercises(workoutIndex, dayIndex);
  } else {
    const exerciseListDiv = document.getElementById('exercise-list');
    if (exerciseListDiv) {
      exerciseListDiv.innerHTML = '<p>Parámetros inválidos en la URL.</p>';
    }
  }
});
