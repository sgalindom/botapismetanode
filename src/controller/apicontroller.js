const { EnviarMensajeWhatsapp } = require("../service/apiservice");

const verificar = (req, res) => {
    try {
        const tokenandercode = "ANDERCODENODEJSAPIMETA";
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && token == tokenandercode) {
            res.send(challenge);
        } else {
            res.status(400).send();
        }
    } catch (e) {
        res.status(400).send();
    }
};

const recibir = (req, res) => {
    try {
        const entry = req.body["entry"][0];
        const changes = entry["changes"][0];
        const value = changes["value"];
        const objetoMensaje = value["messages"];

        if (objetoMensaje) {
            const messages = objetoMensaje[0];
            const text = messages["text"]["body"];
            const number = messages["from"];

            console.log("Enviado desde: " + number + " el texto es el siguiente: " + text);

            // Lógica para manejar las respuestas del usuario
            if (text === "1") {
                EnviarMensajeWhatsapp("text", { body: "Hola mundo" }, number);
                PreguntarAyuda(number);
            } else if (text === "2") {
                EnviarMensajeWhatsapp("document", {
                    link: "https://manglar.uninorte.edu.co/bitstream/handle/10584/9276/Proyecto%20final%20Jhon%20Cerpa%2C%20Manuel%20Chala%2C%20Brandon%20Gonzalez%20%281%29.pdf?sequence=1&isAllowed=y",
                    caption: "Historia Clinica"
                }, number);
                PreguntarAyuda(number);
            } else if (text === "3") {
                EnviarMensajeWhatsapp("location", {
                    latitude: "7.120383346364507",
                    longitude: "-73.11097485132196",
                    name: "Clinica La Riviera",
                    address: "Cl. 51 #38-53, Cabecera del llano, Bucaramanga, Santander"
                }, number);
                PreguntarAyuda(number);
            } else if (text === "4") {
                EnviarMensajeWhatsapp("image", {
                    link: "https://clinicalariviera.com/wp-content/uploads/2024/01/DSC2430-600x500.jpg"
                }, number);
                PreguntarAyuda(number);
            } else if (text === "5") {
                EnviarMensajeWhatsapp("text", {
                    body: "Please visit https://youtu.be/hpltvTEiRrY to inspire your day!"
                }, number);
                PreguntarAyuda(number);
            } else if (text === "1" || text.toLowerCase() === "si") {
                MostrarMenu(number);
            } else if (text === "2" || text.toLowerCase() === "no") {
                EnviarMensajeWhatsapp("text", { body: "Gracias y hasta luego." }, number);
            } else {
                MostrarMenu(number);
            }
        }

        res.send("EVENT_RECEIVED");
    } catch (e) {
        console.log(e);
        res.send("EVENT_RECEIVED");
    }
};

const MostrarMenu = (number) => {
    const menu = "Seleccione una opción:\n1. Hola Mundo\n2. Documento\n3. Dirección\n4. Imagen\n5. Video";
    EnviarMensajeWhatsapp("text", { body: menu }, number);
};

const PreguntarAyuda = (number) => {
    const pregunta = "¿Necesitas ayuda en algo más?\n1. Sí\n2. No";
    EnviarMensajeWhatsapp("text", { body: pregunta }, number);
};

module.exports = {
    verificar,
    recibir
};
