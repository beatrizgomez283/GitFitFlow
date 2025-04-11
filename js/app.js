// app.js

function showExercises(workoutIndex, dayIndex) {
  const day = workouts[workoutIndex].days[dayIndex];
  console.log(`Mostrando ejercicios para: ${day.name}`); // Depuración

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

  // Crear el botón solo una vez, si no existe ya
  if (!document.getElementById("start-btn")) {
    console.log("Creando el botón de inicio"); // Depuración
    const startBtn = document.createElement("button");
    startBtn.id = "start-btn";  // Asignamos un ID para no duplicar el botón
    startBtn.innerText = "🏁 Empezar entrenamiento";
    startBtn.onclick = () => startWorkout(workoutIndex, dayIndex);
    exerciseListDiv.appendChild(startBtn);
  }
}

function startWorkout(workoutIndex, dayIndex) {
  const workout = workouts[workoutIndex];
  const day = workout.days[dayIndex];
  let currentExercise = 0;
  const results = [];

  console.log(`Iniciando entrenamiento para: ${workout.name} - ${day.name}`); // Depuración

  // Ocultar el botón de inicio
  const startBtn = document.getElementById("start-btn");
  if (startBtn) {
    startBtn.style.display = "none";
  }

  function showExercise() {
    const ex = day.exercises[currentExercise];
    console.log(`Mostrando ejercicio: ${ex.name}`); // Depuración

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
  function showWorkouts() {
    console.log(workouts);  // Verifica que workouts contiene los datos correctos
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
    console.log(`Mostrando días para el workout: ${workouts[workoutIndex].name}`);
    const workout = workouts[workoutIndex];
    
    dayListDiv.innerHTML = `<h2>${workout.name}</h2><h3>Selecciona un día</h3>`;
    
    workout.days.forEach((d, i) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerText = d.name;
      div.onclick = () => showExercises(workoutIndex, i);
      dayListDiv.appendChild(div);
    });
  
    // Asegúrate de que la lista de días sea visible
    dayListDiv.classList.remove("hidden");
    exerciseListDiv.classList.add("hidden");
  }  

  showExercise();
}
