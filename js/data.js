const workouts = [
  {
    name: "Workout 1",
    days: [
      {
        name: "Day 1",
        exercises: [
          { name: "Push-ups", sets: 3, target: 15, type: "reps" },
          { name: "Plank", sets: 3, target: 30, type: "secs" }
        ]
      },
      {
        name: "Day 2",
        exercises: [
          { name: "Squats", sets: 4, target: 12, type: "reps" },
          { name: "Jumping Jacks", sets: 4, target: 40, type: "secs" }
        ]
      }
    ]
  }
];

// Luego, puedes usar workouts
console.log(workouts);
