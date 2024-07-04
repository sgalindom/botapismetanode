const https = require("https");

function EnviarMensajeWhatsapp(text, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "573202212377",
        "type": "text",
        "text": {
            "preview_url": false,
            "body": "hola inge eder esto es una prueba del chat bot"
        }
    });

    const options = {
        hostname: "graph.facebook.com",
        path: "/v19.0/349809654879706/messages",
        method: "POST",
        body : data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAHLNEoY0UkBO8iFZBFWTJlfeOZAqauZBZA5OgS8fv4GxchmQ5MxZCD8OqVcFZCgyvS6fOoWX5UP1pPLl0OyZBX2RG3bLN3kwXE6vsbh2vSWY5fxCdyTjUCZBuPmMuoDebiUcYwi7j5pjdbxxYYMh1JKqABnzpoc4AZCvvE3yt2ZB8XCn8n8mdleHGVJrTjvjfi9uVC9jsAnlsQYZBGnkpHOwZDZD"
        }
    };

    const req = https.request (options, res =>{
        res.on("data",d=>{
            process.stdout.write(d);
        });
    });
    req.write(data);
    req.end ();
}


module.exports = {
    EnviarMensajeWhatsapp
};