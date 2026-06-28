-- schema.sql — Estructura de referencia para la tabla "propiedades".
-- Ajusta nombres y tipos a tu base de datos real de evaluaciones anteriores;
-- esto es solo una guía para que el endpoint de ejemplo (propiedades.php) funcione.

CREATE TABLE IF NOT EXISTS propiedades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    ubicacion VARCHAR(150) NOT NULL,
    precio DECIMAL(14,0) NOT NULL DEFAULT 0,
    superficie_m2 INT NOT NULL DEFAULT 0,
    dormitorios INT NOT NULL DEFAULT 0,
    banos INT NOT NULL DEFAULT 0,
    estacionamientos INT NOT NULL DEFAULT 0,
    piscina TINYINT(1) NOT NULL DEFAULT 0,
    anio_construccion INT NULL,
    descripcion TEXT,
    imagenes TEXT COMMENT 'URLs separadas por coma',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO propiedades
    (titulo, ubicacion, precio, superficie_m2, dormitorios, banos, estacionamientos, piscina, anio_construccion, descripcion, imagenes)
VALUES
    ("Casa Los Robles", "Vitacura, Santiago", 685000000, 320, 4, 3, 2, 1, 2019,
     "Residencia contemporánea de dos pisos con terraza, jardines maduros y piscina.",
     "https://images.unsplash.com/photo-1564013799919-ab600027ffc6,https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"),
    ("Penthouse Mirador del Parque", "Las Condes, Santiago", 540000000, 210, 3, 3, 2, 0, 2021,
     "Penthouse con terraza panorámica y vista a la cordillera.",
     "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688");
