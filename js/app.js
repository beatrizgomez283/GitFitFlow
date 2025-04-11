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

  const backBtn = document.createElement("button");
  backBtn.innerText = "⬅️ Volver";
  backBtn.onclick = () => showDays(workoutIndex);
  exerciseListDiv.appendChild(backBtn);

  exerciseListDiv.classList.remove("hidden");
}

showWorkouts();
