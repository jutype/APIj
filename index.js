const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Cargar los códigos postales desde el archivo JSON
const codigos = JSON.parse(fs.readFileSync('codigos_postales.json', 'utf8'));
const tiempos = JSON.parse(fs.readFileSync('tiempos.json', 'utf8'));

app.get('/servicio/:codigo_postal', (req, res) => {
  const codigo = req.params.codigo_postal;
  let servicio = null;
  let tiempo = null;

  if (codigos.flash.includes(codigo) && codigos.urbano.includes(codigo)) {
    servicio = 'Flash'; 
  } else if (codigos.flash.includes(codigo)) {
    servicio = 'flash';
  } else if (codigos.urbano.includes(codigo)) {
    servicio = 'urbano';
  }

  // Buscar el tiempo de entrega si existe
  if (tiempos["72"] && tiempos["72"].includes(codigo)) {
    tiempo = "72 Horas";
  } else if (tiempos["120"] && tiempos["120"].includes(codigo)) {
    tiempo = "120 Horas";
  } else if (tiempos["96"] && tiempos["96"].includes(codigo)) {
    tiempo = "96 Horas";
  }

  res.json({ servicio, tiempo });
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
