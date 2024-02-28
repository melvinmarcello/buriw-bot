const Bot = require("node-telegram-bot-api")

require('dotenv').config()

const CurrencyFormat = (value) =>{
    const formated = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value)
  
    return formated
}


const options = {
    polling: true
}

const buriwBot = new Bot(process.env.token, options)

const prefix = "/"

const query = {
    start: new RegExp(`^/start$`),
    help: new RegExp(`^/help$`),
    price: new RegExp(`^${prefix}price`),
}


buriwBot.onText(query.start, (res) =>{
    const message = 'Welcome to Buriw Bot! \n' +  
                   'This bot can help you with the following commands:\n\n'+  
                   '/price => Get current top 10 coins prices.\n' +
                   '/price {coins} => Get spesific coin data \n' +
                   'ex: //price bitcoin';
    buriwBot.sendMessage(res.from.id, message)
})

buriwBot.onText(query.help, (res) =>{
    const message = 'Welcome to Buriw Bot! \n' +  
                   'This bot can help you with the following commands:\n\n'+  
                   '/price => Get current top 10 coins prices.\n' +
                   '/price {coins} => Get spesific coin data \n' +
                   'ex: //price bitcoin';
    buriwBot.sendMessage(res.from.id, message)
})


buriwBot.onText(query.price, async (res) =>{
    let resultText = []
    let coins = res.text.split(' ')
    if(coins.length == 1){
        let data = await fetch(`${process.env.cg_base_url}/coins/markets?vs_currency=usd&per_page=10`)
        let response = await data.json()
        response.map(data =>{
           resultText.push(`${data.name} => $${data.current_price}`)
        })                        
        
        buriwBot.sendMessage(res.from.id, resultText.join('\n'))
    }else{
        let targetCoin = coins[1].toLowerCase();
        let data = await fetch(`${process.env.cg_base_url}/coins/${targetCoin}?localization=false&tickers=true`)
        let response = await data.json()            
                
        if(response.error){
            buriwBot.sendMessage(res.from.id, "Sorry There is No Coin Data With That Name!")
        }else{
            const symbol = response.symbol.toUpperCase()
            
            let message = `
                ${symbol}\n$${response.market_data.current_price.usd}\nMarket Cap => ${CurrencyFormat(response.market_data.market_cap.usd)}
            `        
            buriwBot.sendPhoto(res.from.id, response.image.large, {
                caption: message
            })
        }
    }
    
})