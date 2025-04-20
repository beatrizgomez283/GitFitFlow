import pasta_verduras_ternera from '../assets/nutri/pasta_verduras_ternera.jpg';
import calamares_arroz_brocoli from '../assets/nutri/calamares_arroz_brocoli.jpg';
import salteado_pollo_quinoa from '../assets/nutri/salteado_pollo_quinoa.jpg';
import atun_pan_aguacate_feta from '../assets/nutri/atun_pan_aguacate_feta.jpg';
import huevos_rotos_jamon from '../assets/nutri/huevos_rotos_jamon.jpg';
import pavo_gnocchis from '../assets/nutri/pavo_gnocchis.jpg';


export const recetasNutri = [
    {
        "id": "pasta_verduras_ternera",
        "nombre": "Pasta con verduras y carne",
        "dia": ["L", "X"],
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
        "nota": "PUEDES CAMBIAR LA PASTA POR 6 CDAS CUSCUS / 3 TORTILLAS MEXICANAS DE MAIZ PEQUEÑAS",
        "semana": "1 y 3",
        "comida": "Comida",
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
        "dia": ["L", "X"],
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
        "dia": ["L", "X"],
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
    },
    {
        "id": "salteado_pollo_quinoa",
        "nombre": "Salteado de pollo, pimiento rojo y quinoa",
        "dia": ["M", "J"],
        "tiempoPrep": 10,
        "tiempoCoccion": 10,
        "ingredientes": [
            "1 bote de quinoa microondas o 6 cdas quinoa",
            "3 solomillos de pollo (150g)",
            "1 cda semillas de calabaza",
            "Pimiento rojo",
            "Salsa de soja"
        ],
        "nota": "Puedes cambiar la quinoa por 4-5 tortas de maíz.",
        "semana": "1 y 3",
        "comida": "Comida",
        "calorias": 336.0,
        "proteina": 39.0,
        "carbohidratos": 31.5,
        "grasa": 6.0,
        "pasos": [
            "Cocina la quinoa según las instrucciones del envase o caliéntala si es precocida.",
            "Saltea los solomillos de pollo troceados con pimiento rojo.",
            "Agrega la salsa de soja y las semillas de calabaza al final.",
            "Sirve todo junto caliente."
        ],
        imagen: salteado_pollo_quinoa
    },
    {
        "id": "huevos_rotos_jamon",
        "nombre": "Huevos rotos con jamón",
        "dia": ["M", "J"],
        "tiempoPrep": 10,
        "tiempoCoccion": 10,
        "ingredientes": [
            "2 huevos",
            "3 lonchas jamón serrano (30g)",
            "4 patatas o boniatos babys microondas",
            "Ensalada de rúcula u hojas verdes",
            "Remolacha en tiras",
            "1 tomate",
            "Vinagre de manzana bio o limón"
        ],
        "nota": "Puedes alternar entre patatas y boniatos, así como entre vinagre de manzana y zumo de limón.",
        "semana": "1 y 3",
        "comida": "Cena",
        "calorias": 360,
        "proteina": 25,
        "carbohidratos": 22,
        "grasa": 20,
        "pasos": [
            "Cocina las patatas o boniatos baby en el microondas hasta que estén tiernos.",
            "Fríe o cocina los huevos a tu gusto.",
            "Sirve los huevos sobre las patatas con el jamón serrano por encima.",
            "Acompaña con la ensalada aliñada con vinagre de manzana o limón."
        ],
        imagen: huevos_rotos_jamon
    },
    {
        "id": "pavo_gnocchis",
        "nombre": "Filetes de pavo con gnocchis",
        "dia": ["M","J"],
        "tiempoPrep": 10,
        "tiempoCoccion": 15,
        "ingredientes": [
            "2 filetes de pavo con 15 unid gnocchis (150g)",
            "½ calabacín",
            "2 cdas mozzarella",
            "Orégano y ajo en polvo",
            "300-400ml caldo a elegir para acompañar"
        ],
        "nota": "Puedes usar caldo de verduras, pollo o carne según prefieras.",
        "semana": "1 y 3",
        "comida": "Cena",
        "calorias": 450,
        "proteina": 40,
        "carbohidratos": 30,
        "grasa": 20,
        "pasos": [
            "Cocina los gnocchis según instrucciones del paquete.",
            "A la vez, saltea los filetes de pavo y el calabacín en una sartén con especias.",
            "Agrega la mozzarella para fundir ligeramente al final.",
            "Sirve con el caldo caliente en un bol o como base del plato."
        ],
        imagen: pavo_gnocchis
    }

];

