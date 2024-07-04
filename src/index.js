const express = require("express");
const apiruta = require("./routes/ruta"); // Import verificar and recibir from ruta.js

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use("/api", apiruta);

app.listen(PORT, () => {
    console.log("Hola sebastian, el puerto es: " + PORT);
});