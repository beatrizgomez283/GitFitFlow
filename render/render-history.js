export function showResultsSummary(workoutIndex, dayIndex) {
    document.addEventListener('DOMContentLoaded', function() {
  // Llamada a la función cuando el DOM esté listo
        showResultsSummary(workoutIndex, dayIndex);
    });


  const exerciseListDiv = document.getElementById('history-list');
  console.log(exerciseListDiv); // Verifica si el contenedor es encontrado

  if (!exerciseListDiv) {
    console.error("No se encuentra el elemento con id 'history-list'");
    return;
  }

  const workout = workouts[workoutIndex];
  const day = workout.days[dayIndex];

  exerciseListDiv.innerHTML = `<h2>Historial de Entrenamientos - ${workout.name} - ${day.name}</h2>`;

  const historyKey = `history_${workout.name}_${day.name}`;
  const history = JSON.parse(localStorage.getItem(historyKey)) || [];
    
    console.log("Historial recuperado:", history);


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

  addBackButton("🏠 Volver a días de entrenamiento", () => window.location.href = "day-list.html");

  exerciseListDiv.classList.remove("hidden");
}
