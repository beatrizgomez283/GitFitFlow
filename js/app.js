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
  workoutListDiv.classList.remove("hidden");
  dayListDiv.classList.add("hidden");
  exerciseListDiv.classList.add("hidden");
}

// Mostrar los días del entrenamiento seleccionado
// Show the days for a workout
function showDays(workoutIndex) {
  const workout = workouts[workoutIndex];
  
  // Clear previous content
  dayListDiv.innerHTML = `<h2>${workout.name}</h2><h3>Selecciona un día</h3>`;
  
  workout.days.forEach((d, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = d.name;
    div.onclick = () => showExercises(workoutIndex, i);
    dayListDiv.appendChild(div);
  });

   // Botón para volver a los entrenamientos
   const backBtn = document.createElement("button");
   backBtn.innerText = "🏠 Volver a entrenamientos";
   backBtn.onclick = () => showWorkouts();
   dayListDiv.appendChild(backBtn);

  // Remove 'hidden' class from day list and hide workout list
  dayListDiv.classList.remove("hidden");  // Show the day list
  workoutListDiv.classList.add("hidden"); // Hide workout list
  exerciseListDiv.classList.add("hidden"); // Hide exercise list (ensure it's hidden)
}

// Show exercises for a specific day
function showExercises(workoutIndex, dayIndex) {
  const day = workouts[workoutIndex].days[dayIndex];

  // Clear previous content
  exerciseListDiv.innerHTML = `<h2>${day.name}</h2><h3>Ejercicios</h3>`;

  // Botón para ver el historial
  const historyBtn = document.createElement("button");
  historyBtn.innerText = "Ver Historial de Resultados";
  historyBtn.onclick = () => showWorkoutHistory(workouts[workoutIndex].name, day.name);
  exerciseListDiv.appendChild(historyBtn);

  day.exercises.forEach(ex => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${ex.name}</strong><br>
      Sets: ${ex.sets} - Objetivo: ${ex.target} ${ex.type === "reps" ? "reps" : "segundos"}
    `;
    div.onclick = () => startWorkout(workoutIndex, dayIndex);

    // Botón para volver a los días de entrenamiento
    const backBtn = document.createElement("button");
    backBtn.innerText = "🏠 Volver a días de entrenamiento";
    backBtn.onclick = () => showDays(workoutIndex);
    exerciseListDiv.appendChild(backBtn);
    
    // Show the exercise list, hide the other sections
    exerciseListDiv.classList.remove("hidden");
    dayListDiv.classList.add("hidden");  // Hide the day list
  });

  // Show the exercise list, hide the other sections
  exerciseListDiv.classList.remove("hidden");
  dayListDiv.classList.add("hidden");  // Hide the day list
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

  // Recuperar historial de resultados almacenados
  const historyKey = `history_${workoutName}_${dayName}`;
  let history = JSON.parse(localStorage.getItem(historyKey)) || [];

  // Agregar el nuevo resultado al historial
  history.push({ date, results });

  // Guardar el historial actualizado
  localStorage.setItem(historyKey, JSON.stringify(history));

  // Guardar el resultado actual de manera individual
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
  backBtn.onclick = showWorkouts();
  exerciseListDiv.appendChild(backBtn);
}

function showWorkoutHistory(workoutName, dayName) {
  const historyKey = `history_${workoutName}_${dayName}`;
  const history = JSON.parse(localStorage.getItem(historyKey)) || [];

  exerciseListDiv.innerHTML = `<h2>Historial de Entrenamientos - ${workoutName} - ${dayName}</h2>`;

  if (history.length === 0) {
    exerciseListDiv.innerHTML += "<p>No hay historial de entrenamientos.</p>";
  } else {
    history.forEach(item => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<strong>${item.date}</strong><br>`;

      item.results.forEach(ex => {
        div.innerHTML += `<strong>${ex.name}</strong><br>`;
        ex.sets.forEach((set, i) => {
          div.innerHTML += `Set ${i + 1}: ${set.reps || set.segundos} reps - ${set.weight} kg<br>`;
        });
      });

      exerciseListDiv.appendChild(div);
    });
  }

    // Botón para volver al inicio
    const backBtn = document.createElement("button");
    backBtn.innerText = "🏠 Volver al inicio";
    backBtn.onclick = showWorkouts();
    exerciseListDiv.appendChild(backBtn);
}


// Mostrar la lista de entrenamientos cuando la página carga
showWorkouts();
