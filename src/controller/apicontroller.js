const { EnviarMensajeWhatsapp } = require("../service/apiservice");

const verificar = (req, res) => {
    try {
        var tokenandercode = "ANDERCODENODEJSAPIMETA";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && token == tokenandercode) {
            res.send(challenge);
        } else {
            res.status(400).send();
        }
        console.log(req);
    } catch (e) {
        res.status(400).send();
    }
};

const recibir = (req, res) => {
    try {
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var objetoMensaje = value["messages"];
        if (objetoMensaje) {
            var messages = objetoMensaje[0];
            var text = messages["text"]["body"]; // Asegúrate de que la propiedad sea "text"
            var number = messages["from"];

            console.log("Enviado desde: " + number + " el texto es el siguiente: " + text);

            // Enviar respuesta a través de WhatsApp
            EnviarMensajeWhatsapp("Hola, gracias por tu mensaje.", number);
        }

        res.send("EVENT_RECEIVED");
    } catch (e) {
        console.log(e);
        res.send("EVENT_RECEIVED");
    }
};

module.exports = {
    verificar,
    recibir
};
