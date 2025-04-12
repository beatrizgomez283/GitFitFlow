// Extraer parámetros de la URL

import { workouts } from '../data/workouts.js';
import { showExercises } from './render-exercise-list.js';
import { addBackButton } from '../utils/navigation.js';

const params = new URLSearchParams(window.location.search);
const workoutIndex = parseInt(params.get('workoutIndex'), 10);
const weekIndex = parseInt(params.get('weekIndex'), 10);
const dayIndex = parseInt(params.get('dayIndex'), 10);

// Validar parámetros y mostrar ejercicios
if (!isNaN(workoutIndex) && !isNaN(weekIndex) && !isNaN(dayIndex)) {
  const week = workouts[workoutIndex]?.weeks[weekIndex];
  const day = week?.days[dayIndex];

  if (day) {
    showExercises(workoutIndex, dayIndex);
  } else {
    exerciseListDiv.innerHTML = '<p>No se encontraron ejercicios para este día.</p>';
  }
} else {
  exerciseListDiv.innerHTML = '<p>Parámetros inválidos en la URL.</p>';
}
