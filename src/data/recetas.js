import banana_bread_con_nueces from '../assets/recetas/banana_bread_con_nueces.jpg';
import hummus_pan_zanahoria from '../assets/recetas/hummus_pan_zanahoria.jpg';
import boniato_chipotle from '../assets/recetas/boniato_chipotle.jpg';
import yogur_arandanos_kiwi_almendras from '../assets/recetas/yogur_arandanos_kiwi_almendras.jpg';
import mugcake_chocolate from '../assets/recetas/mugcake_chocolate.jpg';
import ensalada_frutas_yogur from '../assets/recetas/ensalada_frutas_yogur.jpg';
import tostada_platano_crema_cacahuete from '../assets/recetas/tostada_platano_crema_cacahuete.jpg';
import smoothie_arandanos_platano_yogur from '../assets/recetas/smoothie_arandanos_platano_yogur.jpg';
import overnight_oats_cacao from '../assets/recetas/overnight_oats_cacao.jpg';

const recetas = [
    {
        id: 'overnight_oats_cacao',
        nombre: 'Overnight oats con cacao',
        tiempoPrep: 5,
        tiempoCoccion: 0,
        calorias: 290,
        proteina: 18,
        carbohidratos: 32,
        grasa: 9,
        nota: 'Desayuno fácil y rápido que puedes dejar preparado la noche anterior.',
        ingredientes: [
            '40g copos de avena',
            '100ml leche',
            '100g yogur natural',
            '1 cdita de cacao puro',
            '1/2 plátano en rodajas',
            '10g proteína en polvo (opcional)',
            'Toppings: nueces, chips de chocolate, fruta fresca'
        ],
        pasos: [
            'Mezclar en un tarro la avena, leche, yogur, cacao y proteína.',
            'Revolver bien y tapar.',
            'Dejar reposar toda la noche en la nevera.',
            'Antes de servir, añadir toppings al gusto.'
        ],
        imagen: overnight_oats_cacao
    },
    {
        id: 'smoothie_arandanos_platano_yogur',
        nombre: 'Smoothie de arándanos, plátano y yogur',
        tiempoPrep: 3,
        tiempoCoccion: 0,
        calorias: 210,
        proteina: 12,
        carbohidratos: 28,
        grasa: 6,
        nota: 'Ideal para después de entrenar o como merienda refrescante.',
        ingredientes: [
            '1/2 plátano',
            '50g arándanos congelados',
            '125g yogur natural o skyr',
            '100ml leche entera o vegetal',
            'Opcional: 1 cdita de miel'
        ],
        pasos: [
            'Colocar todos los ingredientes en una batidora.',
            'Triturar hasta obtener una mezcla suave y homogénea.',
            'Servir frío en vaso o bol.'
        ],
        imagen: smoothie_arandanos_platano_yogur
    },
    {
        id: 'tostada_platano_crema_cacahuete',
        nombre: 'Tostada con plátano y crema de cacahuete',
        tiempoPrep: 5,
        tiempoCoccion: 2,
        calorias: 270,
        proteina: 9,
        carbohidratos: 28,
        grasa: 13,
        nota: 'Perfecta como snack pre-entreno o desayuno rápido.',
        ingredientes: [
            '1 rebanada de pan integral',
            '1/2 plátano',
            '10g crema de cacahuete natural',
            'Canela al gusto'
        ],
        pasos: [
            'Tostar el pan.',
            'Untar la crema de cacahuete sobre la tostada.',
            'Colocar el plátano en rodajas por encima.',
            'Espolvorear con canela.'
        ],
        imagen: tostada_platano_crema_cacahuete
    },
    {
        "id": "banana_bread_con_nueces",
        "nombre": "Banana bread con nueces",
        "tiempoPrep": 5,
        "tiempoCoccion": 30,
        "calorias": 238,
        "proteina": 7,
        "carbohidratos": 30,
        "grasa": 10,
        "tipo": "Desayuno",
        "nota": "Ideal para desayuno o snack postentreno.",
        "ingredientes": [
            "1 plátano maduro",
            "60g harina de avena",
            "1 huevo",
            "1/2 cdita de levadura",
            "Nueces picadas",
            "Canela al gusto"
        ],
        "pasos": [
            "Triturar el plátano con el huevo.",
            "Añadir harina, levadura, canela y mezclar.",
            "Incorporar las nueces.",
            "Hornear a 180ºC durante 30 min."
        ],
        "imagen": banana_bread_con_nueces
    },
    {
        "id": "yogur_arandanos_kiwi_almendras",
        "nombre": "Yogur con arándanos, kiwi y almendras",
        "tiempoPrep": 3,
        "tiempoCoccion": 0,
        "calorias": 238,
        "proteina": 18,
        "carbohidratos": 22,
        "grasa": 8,
        "tipo": "Desayuno",
        "nota": "Rico en proteínas y antioxidantes.",
        "ingredientes": [
            "130g yogur natural 0%",
            "35g arándanos",
            "45g kiwi",
            "10g crema de almendras",
            "5g almendras enteras",
            "10g miel"
        ],
        "pasos": [
            "Verter el yogur en un bol.",
            "Añadir los arándanos y el kiwi troceado.",
            "Incorporar la crema de almendras, miel y almendras."
        ],
        "imagen": yogur_arandanos_kiwi_almendras
    },
    {
        "id": "boniato_chipotle",
        "nombre": "Plato vegano de boniato al chipotle",
        "tiempoPrep": 10,
        "tiempoCoccion": 25,
        "calorias": 617,
        "proteina": 22,
        "carbohidratos": 82,
        "grasa": 22,
        "tipo": "Almuerzo",
        "nota": "Un plato completo vegano con proteínas vegetales.",
        "ingredientes": [
            "120g boniato",
            "155g brócoli",
            "135g garbanzos cocidos",
            "40g arroz integral crudo",
            "45g maíz congelado",
            "30g salsa de tomate",
            "100g aguacate",
            "1 cdta. zumo de lima",
            "1/2 cdta. chipotle en polvo"
        ],
        "pasos": [
            "Hornear el boniato con especias.",
            "Cocer arroz y brócoli.",
            "Saltear garbanzos y maíz.",
            "Montar el bol con aguacate, salsa y lima."
        ],
        "imagen": boniato_chipotle
    },
    {
        id: 'mugcake_chocolate',
        nombre: 'Mugcake de chocolate',
        tiempoPrep: 3,
        tiempoCoccion: 2,
        calorias: 290,
        proteina: 20,
        carbohidratos: 25,
        grasa: 10,
        tipo: "Desayuno",
        nota: 'Ideal como snack dulce alto en proteínas o desayuno exprés.',
        ingredientes: [
            '1 huevo',
            '15g cacao puro en polvo',
            '30g harina de avena',
            '10g proteína en polvo sabor chocolate',
            '1/2 plátano maduro',
            '1/2 cdita levadura',
            'Un chorrito de leche',
            'Opcional: chips de chocolate o nueces'
        ],
        pasos: [
            'Triturar el plátano con el huevo.',
            'Añadir la leche, harina, proteína, cacao y levadura.',
            'Mezclar bien hasta integrar todos los ingredientes.',
            'Verter en una taza apta para microondas.',
            'Cocinar 1:30 a 2 minutos según potencia.'
        ],
        imagen: mugcake_chocolate
    },
    {
        id: 'ensalada_frutas_yogur',
        nombre: 'Ensalada de frutas con yogur',
        tiempoPrep: 5,
        tiempoCoccion: 0,
        calorias: 215,
        proteina: 14,
        carbohidratos: 28,
        grasa: 5,
        tipo: "Desayuno",
        nota: 'Refrescante, ligera y rica en antioxidantes. Perfecta para desayuno o merienda.',
        ingredientes: [
            '100g yogur natural',
            '1/2 manzana',
            '1/2 plátano',
            '30g uvas',
            '1/2 kiwi',
            '10g nueces troceadas',
            '1 cdita de miel (opcional)',
            'Canela al gusto'
        ],
        pasos: [
            'Lavar y cortar las frutas en dados.',
            'Servir el yogur en un bol.',
            'Añadir las frutas encima y mezclar ligeramente.',
            'Espolvorear con nueces, canela y un chorrito de miel si se desea.'
        ],
        imagen: ensalada_frutas_yogur
    }


];

export default recetas;
