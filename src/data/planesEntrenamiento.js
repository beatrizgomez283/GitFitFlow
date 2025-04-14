export const planes = [
    {
        id: 'plan_basico_fuerza',
        nombre: 'Plan Básico de Fuerza',
        descripcion: 'Programa de 4 semanas enfocado en ganar fuerza con ejercicios básicos, ideal para principiantes o para retomar rutina tras una pausa. Incluye trabajo de tren inferior, superior y core, en sesiones alternadas.',
        imagen: '/assets/planes/fuerza_basico.jpg',
        sesiones: [
            {
                nombre: 'Día 1 - Tren inferior',
                descripcion: 'Enfocado en glúteo, cuádriceps e isquiosurales.',
                sets: [
                    {
                        titulo: 'Superserie A',
                        ejercicios: [
                            {
                                nombre: 'Hip Thrust',
                                series: [
                                    { semana: 1, reps: 12, peso: 40 },
                                    { semana: 2, reps: 10, peso: 45 },
                                    { semana: 3, reps: 8, peso: 50 },
                                    { semana: 4, reps: 6, peso: 55 }
                                ],
                                nota: 'Enfócate en la contracción máxima del glúteo.',
                                descanso: 60,
                                media: ['/assets/ejercicios/hip_thrust_1.jpg'],
                                historico: []
                            },
                            {
                                nombre: 'Step-up con mancuernas',
                                series: [
                                    { semana: 1, reps: 10, peso: 10 },
                                    { semana: 2, reps: 10, peso: 12 },
                                    { semana: 3, reps: 8, peso: 14 },
                                    { semana: 4, reps: 8, peso: 16 }
                                ],
                                nota: 'Empuja con la pierna del banco, no con la de apoyo.',
                                descanso: 45,
                                media: ['/assets/ejercicios/step_up_1.jpg'],
                                historico: []
                            }
                        ]
                    },
                    {
                        titulo: 'B - Glúteo aislado',
                        ejercicios: [
                            {
                                nombre: 'Patada de glúteo en polea',
                                series: [
                                    { semana: 1, reps: 15, peso: 5 },
                                    { semana: 2, reps: 12, peso: 7 },
                                    { semana: 3, reps: 12, peso: 9 },
                                    { semana: 4, reps: 10, peso: 10 }
                                ],
                                nota: 'Controla el movimiento excéntrico.',
                                descanso: 30,
                                media: ['/assets/ejercicios/patada_gluteo_1.jpg'],
                                historico: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
