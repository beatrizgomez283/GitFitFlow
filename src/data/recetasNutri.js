import pasta_verduras_ternera from '../assets/nutri/pasta_verduras_ternera.jpg';
import calamares_arroz_brocoli from '../assets/nutri/calamares_arroz_brocoli.jpg';
import atun_pan_aguacate_feta from '../assets/nutri/atun_pan_aguacate_feta.jpg';


export const recetasNutri = [
    {
        "id": "pasta_verduras_ternera",
        "nombre": "Pasta con verduras y carne",
        "dia": ["lunes", "miércoles"],
        "tiempoPrep": 10,
        "tiempoCoccion": 15,
        "ingredientes": [
            "5 cdas macarrones integrales (50g) o 50 unid espaguetti integrales",
            "120g carne picada de ternera 98% o 2 filetes de pavo",
            "2 cdas mozzarella",
            "Salsa de albahaca Hacendado",
            "Cebolla roja",
            "Pimiento rojo",
            "Perejil u orégano fresco"
        ],
        "nota": "Puedes cambiar los macarrones por espaguetis integrales, y la carne por filetes de pavo.",
        "semana": "1 y 3",
        "comida": "Comida",
        "tipo": "comida",
        "calorias": 420.9,
        "proteina": 37.1,
        "carbohidratos": 38.1,
        "grasa": 13.3,
        "pasos": [
            "Cocina los macarrones en agua con sal hasta que estén al dente.",
            "Saltea la carne picada con cebolla roja y pimiento rojo.",
            "Agrega salsa de albahaca y mezcla con la pasta cocida.",
            "Añade mozzarella al gusto y decora con perejil u orégano fresco."
        ],
        imagen: pasta_verduras_ternera
    },
    {
        "id": "calamares_arroz_brocoli",
        "nombre": "Calamares con arroz y brócoli",
        "dia": ["lunes", "miércoles"],
        "tiempoPrep": 5,
        "tiempoCoccion": 10,
        "ingredientes": [
            "5 cdas arroz refrigerado (50g) o 1 bote de arroz integral microondas",
            "200g calamares o sepia congelados",
            "Brócoli (½ plato)",
            "1 cda AOVE con ajo y perejil"
        ],
        "nota": "PUEDES CAMBIAR EL ARROZ POR 4-5 PATATAS BABY MICROONDAS (200G)",
        "semana": "1 y 3",
        "comida": "Cena",
        "tipo": "cena",
        "calorias": 425.8,
        "proteina": 38.4,
        "carbohidratos": 35.9,
        "grasa": 14.3,
        "pasos": [
            "Saltea los calamares con ajo y perejil en una sartén con AOVE.",
            "Cocina el brócoli al vapor o salteado.",
            "Calienta el arroz y mezcla todo en el plato.",
            "Sirve decorado con un poco más de perejil fresco si deseas."
        ],
        imagen: calamares_arroz_brocoli
    },
    {
        "id": "atun_pan_aguacate_feta",
        "nombre": "Atún con pan integral, aguacate o queso feta",
        "dia": ["viernes"],
        "tiempoPrep": 5,
        "tiempoCoccion": 0,
        "ingredientes": [
            "2 latas de atún claro al natural",
            "2 rebanadas de pan integral",
            "½ aguacate o 5 perlas de queso feta",
            "Ensalada de rúcula con tomate y remolacha en tiras"
        ],
        "nota": "Puedes usar aguacate o queso feta como fuente de grasa saludable.",
        "semana": "1 y 3",
        "comida": "Cena",
        "tipo": "cena",
        "calorias": 410,
        "proteina": 35,
        "carbohidratos": 20,
        "grasa": 22,
        "pasos": [
            "Tuesta el pan integral si lo deseas.",
            "Escurre el atún y repártelo sobre el pan.",
            "Añade aguacate en rodajas o las perlas de queso feta.",
            "Acompaña con una ensalada fresca de rúcula, tomate y remolacha."
        ],
        imagen: atun_pan_aguacate_feta
    }
];

