import pasta_verduras_ternera from '../assets/nutri/pasta_verduras_ternera.jpg';
import calamares_arroz_brocoli from '../assets/nutri/calamares_arroz_brocoli.jpg';
import salteado_pollo_quinoa from '../assets/nutri/salteado_pollo_quinoa.jpg';
import atun_pan_aguacate_feta from '../assets/nutri/atun_pan_aguacate_feta.jpg';
import huevos_rotos_jamon from '../assets/nutri/huevos_rotos_jamon.jpg';
import pavo_gnocchis from '../assets/nutri/pavo_gnocchis.jpg';
import ensalada_espinacas_garbanzos_mozzarella from '../assets/nutri/ensalada_espinacas_garbanzos_mozzarella.jpg';
import bowl_verduritas_quinoa_garbanzos from '../assets/nutri/bowl_verduritas_quinoa_garbanzos.jpg';
import salmon_patata_brocoli from '../assets/nutri/salmon_patata_brocoli.jpg';


export const recetasNutri = [
    {
        "id": "salmon_patata_brocoli",
        "nombre": "Salmón a la plancha con patata/boniato y brócoli",
        "dia": ["L", "X"],
        "tiempoPrep": 5,
        "tiempoCoccion": 10,
        "ingredientes": [
            "1 lomo de salmón fresco (~120g)",
            "4 patatas o boniatos baby (~200g)",
            "1 cucharada de aceite de oliva virgen extra",
            "Brócoli (~100g)"
        ],
        "nota": "Puedes cambiar las patatas por 4 cucharadas de arroz o cuscús cocido.",
        "semana": "2 y 4",
        "comida": "Cena",
        "calorias": 474,
        "proteina": 29,
        "carbohidratos": 34,
        "grasa": 24,
        "pasos": [
            "Cocina las patatas o boniatos baby en el microondas según las instrucciones.",
            "Cocina el lomo de salmón a la plancha con una cucharada de AOVE.",
            "Cocina el brócoli al vapor o en microondas.",
            "Sirve el salmón acompañado del brócoli y las patatas o boniatos."
        ],
        "imagen": salmon_patata_brocoli
    },
    {
        "id": "bowl_verduritas_quinoa_garbanzos",
        "nombre": "Bowl templado de verduras, quinoa y garbanzos",
        "dia": ["L", "X"],
        "tiempoPrep": 10,
        "tiempoCoccion": 5,
        "ingredientes": [
            "1/2 calabacín",
            "Tiras de pimiento rojo",
            "Rúcula (~30g)",
            "1 bote de quinoa microondas (125g)",
            "2 cucharadas de cottage (~40g)",
            "1/4 bote grande de garbanzos cocidos (~100g)",
            "1/2 aguacate",
            "Vinagre, sal y perejil al gusto"
        ],
        "nota": "Puedes variar el aliño o añadir más rúcula si deseas.",
        "semana": "2 y 4",
        "comida": "Comida",
        "calorias": 575,
        "proteina": 24,
        "carbohidratos": 63,
        "grasa": 22,
        "pasos": [
            "Saltea el calabacín y las tiras de pimiento rojo.",
            "Calienta la quinoa en el microondas siguiendo las instrucciones.",
            "Enjuaga los garbanzos cocidos.",
            "Monta el bowl con rúcula en la base, quinoa, verduras salteadas y garbanzos.",
            "Añade el cottage y medio aguacate en rodajas.",
            "Aliña con vinagre, sal y perejil al gusto antes de servir."
        ],
        "imagen": bowl_verduritas_quinoa_garbanzos
    },
    {
      id: "ensalada_espinacas_garbanzos_mozzarella",
      nombre: "Ensalada de espinacas, garbanzos, tomate y mozzarella",
      tiempoPrep: 10,
      tiempoCoccion: 0,
      calorias: 527,
      proteina: 27,
      carbohidratos: 39,
      grasa: 24,
      semana: "2 y 4", // Modificar si quieres
      comida: "Comida", // Modificar si quieres
      dia: ["L", "X"], // Modificar si quieres
      nota: "Ingredientes de Mercadona (Hacendado).",
      ingredientes: [
        "200g garbanzos cocidos (1/2 bote grande)",
        "Espinacas frescas (~50g)",
        "1 perla de mozzarella fresca light (~50g)",
        "1 tomate mediano (~120g)",
        "Cebolla morada al gusto (~20g)",
        "6-8 aceitunas negras (~20g)",
        "1 cucharadita de aceite de oliva virgen extra (AOVE) (~5g)"
      ],
      pasos: [
        "Escurrir y enjuagar los garbanzos cocidos.",
        "Lavar las espinacas y el tomate.",
        "Cortar la perla de mozzarella en trozos.",
        "Picar el tomate y la cebolla morada.",
        "En un bol grande, mezclar las espinacas, garbanzos, tomate, cebolla, aceitunas y mozzarella.",
        "Aliñar con 1 cucharadita de AOVE justo antes de servir."
      ],
      imagen: ensalada_espinacas_garbanzos_mozzarella
    },
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
        "calorias": 450,
        "proteina": 34,
        "carbohidratos": 43,
        "grasa": 15,
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
        "calorias": 450,
        "proteina": 39,
        "carbohidratos": 45,
        "grasa": 13,
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
        "calorias": 420,
        "proteina": 35,
        "carbohidratos": 24,
        "grasa": 18,
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
        "calorias": 395,
        "proteina": 42,
        "carbohidratos": 32,
        "grasa": 10,
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
        "calorias": 400,
        "proteina": 29,
        "carbohidratos": 35,
        "grasa": 16,
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
        "calorias": 470,
        "proteina": 48,
        "carbohidratos": 52,
        "grasa": 7,
        "pasos": [
            "Cocina los gnocchis según instrucciones del paquete.",
            "A la vez, saltea los filetes de pavo y el calabacín en una sartén con especias.",
            "Agrega la mozzarella para fundir ligeramente al final.",
            "Sirve con el caldo caliente en un bol o como base del plato."
        ],
        imagen: pavo_gnocchis
    }

];

