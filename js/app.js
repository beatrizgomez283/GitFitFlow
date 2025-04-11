// app.js

import { workouts } from './data.js';  // Asegúrate de que el archivo data.js está en la misma carpeta

// Referencias a los elementos del DOM
const workoutListDiv = document.getElementById("workout-list");
const dayListDiv = document.getElementById("day-list");
const exerciseListDiv = document.getElementById("exercise-list");

// Mostrar la lista de entrenamientos
function showWorkouts() {
  workoutListDiv.innerHTML = "<h2>Selecciona un Workout</h2>";

  // Itera sobre cada entrenamiento y crea un botón para cada uno
  workouts.forEach((workout, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = workout.name;
    div.onclick = () => showDays(i);  // Al hacer clic, muestra los días del entrenamiento
    workoutListDiv.appendChild(div);
  });

  // Oculta la lista de días y ejercicios
  dayListDiv.classList.add("hidden");
  exerciseListDiv.classList.add("hidden");
}

// Mostrar los días del entrenamiento seleccionado
function showDays(workoutIndex) {
  const workout = workouts[workoutIndex];
  
  dayListDiv.innerHTML = `<h2>${workout.name}</h2><h3>Selecciona un día</h3>`;

  // Crea un botón para cada día
  workout.days.forEach((day, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = day.name;
    div.onclick = () => showExercises(workoutIndex, i);  // Al hacer clic, muestra los ejercicios del día
    dayListDiv.appendChild(div);
  });

  dayListDiv.classList.remove("hidden");
  exerciseListDiv.classList.add("hidden");
}

// Mostrar los ejercicios del día seleccionado
function showExercises(workoutIndex, dayIndex) {
  const day = workouts[workoutIndex].days[dayIndex];
  
  exerciseListDiv.innerHTML = `<h2>${day.name}</h2><h3>Ejercicios</h3>`;

  // Crea un listado de los ejercicios
  day.exercises.forEach(ex => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${ex.name}</strong><br>
      Sets: ${ex.sets} - Objetivo: ${ex.target} ${ex.type === "reps" ? "reps" : "segundos"}
    `;
    exerciseListDiv.appendChild(div);
  });

  // Botón para empezar el entrenamiento
  const startBtn = document.createElement("button");
  startBtn.innerText = "🏁 Empezar entrenamiento";
  startBtn.onclick = () => startWorkout(workoutIndex, dayIndex);
  exerciseListDiv.appendChild(startBtn);
}

// Empezar el entrenamiento y registrar los resultados
function startWorkout(workoutIndex, dayIndex) {
  const workout = workouts[workoutIndex];
  const day = workout.days[dayIndex];
  let currentExercise = 0;
  const results = [];

  exerciseListDiv.innerHTML = "";

  // Función para mostrar los ejercicios uno a uno
  function showExercise() {
    const ex = day.exercises[currentExercise];
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h2>${ex.name}</h2><p>Introduce tus resultados</p>`;

    const form = document.createElement("form");
    const setsInputs = [];

    // Crea los campos para introducir los resultados de los sets
    for (let i = 0; i < ex.sets; i++) {
      const setDiv = document.createElement("div");
      setDiv.innerHTML = `
        <label>Set ${i + 1}: 
          <input type="number" placeholder="${ex.type === 'reps' ? 'Reps' : 'Segundos'}" required /> 
          <input type="number" placeholder="Peso (kg)" required />
        </label>
      `;
      setsInputs.push(setDiv);
      form.appendChild(setDiv);
    }

    // Botón para pasar al siguiente ejercicio o finalizar
    const nextBtn = document.createElement("button");
    nextBtn.type = "submit";
    nextBtn.innerText = currentExercise < day.exercises.length - 1 ? "Siguiente" : "Finalizar";
    form.appendChild(nextBtn);

    // Al enviar el formulario, guarda los resultados y pasa al siguiente ejercicio
    form.onsubmit = (e) => {
      e.preventDefault();
      const setResults = setsInputs.map(div => {
        const inputs = div.querySelectorAll("input");
        return {
          [ex.type]: parseInt(inputs[0].value),
          weight: parseFloat(inputs[1].value)
        };
      });
      results.push({ name: ex.name, sets: setResults });

      currentExercise++;
      if (currentExercise < day.exercises.length) {
        exerciseListDiv.innerHTML = "";
        showExercise();
      } else {
        saveWorkoutResult(workout.name, day.name, results);
        showResultsSummary(workout.name, day.name, results);
      }
    };

    div.appendChild(form);
    exerciseListDiv.appendChild(div);
  }

  showExercise();
}

// Guardar los resultados del entrenamiento en localStorage
function saveWorkoutResult(workoutName, dayName, results) {
  const date = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD
  const key = `${date}_${workoutName}_${dayName}`;
  localStorage.setItem(key, JSON.stringify(results));
}

// Mostrar un resumen de los resultados guardados
function showResultsSummary(workoutName, dayName, results) {
  exerciseListDiv.innerHTML = `<h2>✅ Entrenamiento guardado</h2><p>${workoutName} - ${dayName}</p>`;
  results.forEach(ex => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${ex.name}</strong><br>`;
    ex.sets.forEach((set, i) => {
      div.innerHTML += `Set ${i + 1}: ${set.reps || set.segundos} reps - ${set.weight} kg<br>`;
    });
    exerciseListDiv.appendChild(div);
  });

  // Botón para volver al inicio
  const backBtn = document.createElement("button");
  backBtn.innerText = "🏠 Volver al inicio";
  backBtn.onclick = showWorkouts;
  exerciseListDiv.appendChild(backBtn);
}

// Mostrar la lista de entrenamientos cuando la página carga
showWorkouts();
