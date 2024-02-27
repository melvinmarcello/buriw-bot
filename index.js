const Bot = require("node-telegram-bot-api")
require('dotenv').config()

const options = {
    polling: true
}

const buriwBot = new Bot(process.env.token, options)

const prefix = "\\"

const query = {
    start: /^start$/,
}




buriwBot.on("message", (res)=>{
    buriwBot.sendMessage(res.from.id, "Halo Riw")
})

// buriwBot.onText(query.start, (res)=>{
//     res.sendMessage(res.from.id, "Halo Riw")

// })
