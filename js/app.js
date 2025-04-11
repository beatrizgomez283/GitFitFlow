const workoutListDiv = document.getElementById("workout-list");
const dayListDiv = document.getElementById("day-list");
const exerciseListDiv = document.getElementById("exercise-list");

function showWorkouts() {
  workoutListDiv.innerHTML = "<h2>Selecciona un Workout</h2>";
  workouts.forEach((w, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = w.name;
    div.onclick = () => showDays(i);
    workoutListDiv.appendChild(div);
  });
  dayListDiv.classList.add("hidden");
  exerciseListDiv.classList.add("hidden");
}

function showDays(workoutIndex) {
  const workout = workouts[workoutIndex];
  
  // Limpia el contenido antes de agregar nuevos elementos
  dayListDiv.innerHTML = `<h2>${workout.name}</h2><h3>Selecciona un día</h3>`;
  
  workout.days.forEach((d, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = d.name;
    div.onclick = () => showExercises(workoutIndex, i);
    dayListDiv.appendChild(div);
  });

  dayListDiv.classList.remove("hidden");
  exerciseListDiv.classList.add("hidden");
}
function showExercises(workoutIndex, dayIndex) {
  const day = workouts[workoutIndex].days[dayIndex];
  exerciseListDiv.innerHTML = `<h2>${day.name}</h2><h3>Ejercicios</h3>`;
  day.exercises.forEach(ex => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${ex.name}</strong><br>
      Sets: ${ex.sets} - Objetivo: ${ex.target} ${ex.type === "reps" ? "reps" : "segundos"}
    `;
    exerciseListDiv.appendChild(div);
  });

 const startBtn = document.createElement("button");
startBtn.innerText = "🏁 Empezar entrenamiento";
startBtn.onclick = () => startWorkout(workoutIndex, dayIndex);
exerciseListDiv.appendChild(startBtn);
  
}

function startWorkout(workoutIndex, dayIndex) {
  const workout = workouts[workoutIndex];
  const day = workout.days[dayIndex];
  let currentExercise = 0;
  const results = [];

  exerciseListDiv.innerHTML = "";

  function showExercise() {
    const ex = day.exercises[currentExercise];
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h2>${ex.name}</h2><p>Introduce tus resultados</p>`;

    const form = document.createElement("form");
    const setsInputs = [];

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

    const nextBtn = document.createElement("button");
    nextBtn.type = "submit";
    nextBtn.innerText = currentExercise < day.exercises.length - 1 ? "Siguiente" : "Finalizar";
    form.appendChild(nextBtn);

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


showWorkouts();

function saveWorkoutResult(workoutName, dayName, results) {
  const date = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD
  const key = `${date}_${workoutName}_${dayName}`;
  localStorage.setItem(key, JSON.stringify(results));
}

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

  const backBtn = document.createElement("button");
  backBtn.innerText = "🏠 Volver al inicio";
  backBtn.onclick = showWorkouts;
  exerciseListDiv.appendChild(backBtn);
}

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

  const backBtn = document.createElement("button");
  backBtn.innerText = "🏠 Volver al inicio";
  backBtn.onclick = showWorkouts;
  exerciseListDiv.appendChild(backBtn);
}

