const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Cargar los códigos postales desde el archivo JSON
const codigos = JSON.parse(fs.readFileSync('codigos_postales.json', 'utf8'));

app.get('/servicio/:codigo_postal', (req, res) => {
  const codigo = req.params.codigo_postal;
  let servicio = null;

  if (codigos.flash.includes(codigo) && codigos.urbano.includes(codigo)) {
    servicio = 'Flash'; 
  } else if (codigos.flash.includes(codigo)) {
    servicio = 'flash';
  } else if (codigos.urbano.includes(codigo)) {
    servicio = 'urbano';
  }

  res.json({ servicio });
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
