// Datos de demostración.
// Se usan SOLO como respaldo si la API PHP (VITE_API_URL) no responde,
// para que la SPA nunca quede en blanco mientras conectas tu backend real.
// La forma de cada objeto debe coincidir con lo que tu archivo PHP debe retornar
// (ver README.md y api-php-example/propiedades.php).

const mockProperties = [
  {
    id: 1,
    title: "Casa Los Robles",
    location: "Vitacura, Santiago",
    price: 685000000,
    surface_m2: 320,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    pool: true,
    year_built: 2019,
    description:
      "Residencia contemporánea de dos pisos rodeada de jardines maduros. Living-comedor de doble altura, cocina integrada con isla central y terraza techada con vista al patio y piscina. Ubicada en calle tranquila a pasos de parques y colegios.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 2,
    title: "Penthouse Mirador del Parque",
    location: "Las Condes, Santiago",
    price: 540000000,
    surface_m2: 210,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    pool: false,
    year_built: 2021,
    description:
      "Penthouse con terraza panorámica de 60 m², vista despejada a la cordillera. Departamento full equipado, cocina con cubierta de cuarzo y bodega independiente. Edificio con piscina, gimnasio y conserjería 24/7.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 3,
    title: "Casa de Campo El Almendro",
    location: "Chicureo, Colina",
    price: 920000000,
    surface_m2: 480,
    bedrooms: 5,
    bathrooms: 4,
    parking: 4,
    pool: true,
    year_built: 2016,
    description:
      "Propiedad de un piso en condominio con seguridad privada. Quincho techado, piscina con deck de madera y parque de 1.500 m² con árboles nativos. Ideal para familias que buscan tranquilidad sin alejarse de la ciudad.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 4,
    title: "Departamento Estudio Costanera",
    location: "Providencia, Santiago",
    price: 145000000,
    surface_m2: 48,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    pool: false,
    year_built: 2022,
    description:
      "Departamento luminoso de planta eficiente, a pasos del metro y parque fluvial. Excelente opción de inversión por su alta demanda de arriendo. Edificio con cowork, lavandería y rooftop.",
    images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 5,
    title: "Casa Vista al Mar",
    location: "Zapallar, Valparaíso",
    price: 1180000000,
    surface_m2: 390,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    pool: true,
    year_built: 2018,
    description:
      "Casa de playa con vista panorámica al océano desde todas sus habitaciones. Terraza con piscina infinity, acceso directo a sendero costero y deck para atardeceres. Diseño en madera nativa y piedra local.",
    images: [
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 6,
    title: "Townhouse Barrio Italia",
    location: "Ñuñoa, Santiago",
    price: 310000000,
    surface_m2: 165,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    pool: false,
    year_built: 2015,
    description:
      "Casa estilo townhouse remodelada, a pasos de cafés, galerías y restaurantes del barrio. Patio interior con citófono y terraza techada en segundo piso. Ideal para quienes buscan identidad de barrio y plusvalía.",
    images: [
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509782-20d39509f26d?auto=format&fit=crop&w=1200&q=80",
    ],
  },
]

export default mockProperties
