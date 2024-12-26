import express from "express";
// import './libs/telegram-bot.js'
import { start } from "./apis/start.js";
import { token } from "./config.js";
import cors from 'cors'
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json())
app.use(express.static('./public/dist'))
app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}))
app.get('/api/start', async (req, res) => {
    try {
        console.log('start')
        const ress = await start()
        if (ress?.err) return res.json(ress).status(500)
        res.json(ress)
    } catch (error) {
        res.json({ msg: 'something gone wrong', err: true }).status(500)
    }
})

app.post('/api/message', async (req, res) => {
    try {
        console.log(req.body)
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        const response = await fetch("https://api.julius.ai/api/chat/message", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
                "authorization": "Bearer " + token,
                "content-type": "application/json",
                "conversation-id": req?.body?.conversationId,
                "cypress-test-id": "b14065b7",
                "ga-client-id": "2092621048.1734420801",
                "gcs": "true",
                "interactive-charts": "true",
                "is-demo": "null",
                "is-native": "false",
                "platform": "web",
                "priority": "u=1, i",
                "request-id": "undefined",
                "sec-ch-ua": "\"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "use-dict": "true",
                "visitor-id": "undefined",
                "Referer": "https://julius.ai/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": JSON.stringify({
                message: { content: req?.body?.content },
                provider: 'default',
                chat_mode: 'auto',
                client_version: '20240130',
                theme: 'dark',
                new_images: [],
                new_attachments: {},
                dataframe_format: 'json',
                selectedModels: null
            }),
            "method": "POST"
        });
        const reader = response.body.getReader();

        // Read the stream
        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                res.write('data: [DONE]\n\n');
                break;
            }

            // Convert the Uint8Array to string and send it
            const chunk = new TextDecoder().decode(value);
            res.write(`data: ${chunk}\n\n`);
        }

        res.end();
    } catch (error) {
        res.json({ msg: 'something gone wrong', err: true }).status(500)
    }
})


app.listen(port);

setInterval(async () => {
    try {
        await fetch(process.env?.URL);
    } catch (error) { }
}, 20000);