const https = require("https");

function EnviarMensajeWhatsapp(type, data, number) {
    const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: number,
        type: type,
        [type]: data
    };

    const options = {
        hostname: "graph.facebook.com",
        path: "/v19.0/349809654879706/messages",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAQwpP4h970BOyOQ1GxmNdn7jReM14DGqHNYPVHTRbjuvEuFkb8ZCh3rXZBkUeGwihF4auJ70olwiZCFujvV53vUZBStpJSIStCBfHgBafDrtXYfF9a4IAnMVlhGP3VZA4kUjEjQ8VeB2U1pv1bjiqpK4xntctxrmZAB0L6pesNXGTvZApeTEgKqw5zlMZCgBFhgL22i0FMwN85hW53YFAZDZD"
        }
    };

    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
        });
    });

    req.write(JSON.stringify(payload));
    req.end();
}

module.exports = {
    EnviarMensajeWhatsapp
};
