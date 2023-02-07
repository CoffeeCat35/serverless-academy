const axios = require('axios');
const NodeCache = require("node-cache");
const myCache = new NodeCache();

monoBank = {
    buyEUR: '',
    sellEUR: '',
    buyUSD: '',
    sellUSD: '',
}

privatBank = {
    buyEUR: '',
    sellEUR: '',
    buyUSD: '',
    sellUSD: '',
}

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '6132197814:AAFYt6kQ_68zpQjjbsBmFscaU-eO2njIyNY';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

let ForecastInThreeHoursInterval;
let ForecastSixHoursInterval;

//start command
bot.setMyCommands([
    { command: '/start', description: 'Request a weather forecast' }
])

//start menu's buttons
const ForecastInPenrithAndExchangeRates = {
    reply_markup: {
        "keyboard":
            [
                [{ text: 'Forecast in Penrith', callback_data: 'ForecastInPenrith' }],
                [{ text: 'Exchange Rates', callback_data: 'Exchange Rates' }],
            ]
    }
}

//buttons for forecast
const ForecastOptions = {
    reply_markup: {
        "keyboard":
            [
                [{ text: 'At intervals of 3 hours', callback_data: '/weatherIntervalThree' }],
                [{ text: 'At intervals of 6 hours', callback_data: '/weatherIntervalSix' }],
                [{ text: 'Stop interval', callback_data: '/weatherIntervalSix' }],
                [{ text: 'Back To Start', callback_data: '/back' }],
            ]
    }
}

//buttons for exchange rates
const ExchangeRatesOptions = {
    reply_markup: {
        "keyboard":
            [
                [{ text: 'EUR', callback_data: 'ExchangeRatesInEUR' }],
                [{ text: 'USD', callback_data: 'ExchangeRatesInUSD' }],
                [{ text: 'Back To Start', callback_data: '/back' }],
            ]
    }
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text === '/start' || msg.text === 'Back To Start') {   //if user pressd '/start' or 'Back to start' show start menu
        bot.sendMessage(chatId, "Forecast in Penrith and Exchange Rates", ForecastInPenrithAndExchangeRates);
    }
    else if (msg.text === 'Forecast in Penrith') { //if user pressd 'Forecast in Penrith' show forecast menu
        return bot.sendMessage(chatId, "Choose interval", ForecastOptions);
    }
    else if (msg.text === 'Exchange Rates') { //if user pressd 'Exchange Rates' show exchange rates menu
        return bot.sendMessage(chatId, "Choose currency", ExchangeRatesOptions);
    }
    else if (msg.text === 'At intervals of 3 hours') { //if user pressd 'At intervals of 3 hours' clear last interval and set inteval in 3 hours
        clearInterval(ForecastSixHoursInterval);
        SendMessageWithWeatherDataWithInterval(chatId);
        ForecastInThreeHoursInterval = setInterval(() => {
            SendMessageWithWeatherDataWithInterval(chatId);
        }, 10800000);
    }
    else if (msg.text === 'At intervals of 6 hours') { //if user pressd 'At intervals of 6 hours' clear last interval and set inteval in 6 hours
        clearInterval(ForecastInThreeHoursInterval);
        SendMessageWithWeatherDataWithInterval(chatId);
        ForecastSixHoursInterval = setInterval(() => {
            SendMessageWithWeatherDataWithInterval(chatId);
        }, 21600000);
    }
    else if (msg.text === 'Stop interval') {  //if user pressd 'Stop interval' clear last interval
        clearInterval(ForecastInThreeHoursInterval);
        clearInterval(ForecastSixHoursInterval);
    }
    else if (msg.text === 'EUR') { //if user pressd 'EUR' show all exchange rate for euro
        ExchangeRatesInEURToGRNPrivateBank(chatId);
        ExchangeRatesInEURToGRNMonoBank(chatId);
    }
    else if (msg.text === 'USD') { //if user pressd 'USD' show all exchange rate for dollars
        ExchangeRatesInUSDToGRNPrivateBank(chatId);
        ExchangeRatesInUSDToGRNMonoBank(chatId);
    }
    else { //if user write something then send message about error
        return bot.sendMessage(chatId, "Sorry, I can't understand you, try again!)");
    }
})

function SendMessageWithWeatherDataWithInterval(chatId) {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Penrith&appid=8bcf7b1c359b8d0ef12bea8694cb66d4`).then(resp => {
        //claim all data about weather and clear it
        var temp = Math.floor(resp.data.list[0].main.temp - 273.15);
        var date = resp.data.list[0].dt_txt;
        var clouds = resp.data.list[0].weather[0].description;

        var dataAbouWeatherInHoursInterval = `In the city of Pernit, the air temperature is ${temp} degree Celsius on ${date}, ${clouds}`;
        //send message with forecast to user
        return bot.sendMessage(chatId, dataAbouWeatherInHoursInterval);
    })
}

function ExchangeRatesPrivatBank() {
    if (myCache.get("PrivatBuyEUR") == undefined) {
        axios.get(`https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11`).then(resp => {
            //claim all data about exchange rate and clear it
            privatBank.buyEUR = resp.data[0].buy;
            privatBank.sellEUR = resp.data[0].buy;
            privatBank.buyUSD = resp.data[1].buy;
            privatBank.sellUSD = resp.data[1].buy;
            //cache all clear data
            myCache.mset([
                { key: "PrivatBuyEUR", val: privatBank.buyEUR },
                { key: "PrivatSellEUR", val: privatBank.sellEUR },
                { key: "PrivatBuyUSD", val: privatBank.buyUSD },
                { key: "PrivatSellUSD", val: privatBank.sellUSD },
            ], 600);
        });
    }
}

function ExchangeRatesMonoBank() {
    if (myCache.get("MonoBuyEUR") == undefined) {
        axios.get(`https://api.monobank.ua/bank/currency`).then(resp => {
            //claim all data about exchange rate and clear it
            monoBank.buyEUR = resp.data[1].rateBuy;
            monoBank.sellEUR = resp.data[1].rateSell;
            monoBank.buyUSD = resp.data[0].rateBuy;
            monoBank.sellUSD = resp.data[0].rateSell;
            //cache all clear data
            myCache.mset([
                { key: "MonoBuyEUR", val: monoBank.buyEUR },
                { key: "MonoSellEUR", val: monoBank.sellEUR },
                { key: "MonoBuyUSD", val: monoBank.buyUSD },
                { key: "MonoSellUSD", val: monoBank.sellUSD },
            ], 600);
        });
    }
}

function ExchangeRatesInEURToGRNPrivateBank(chatId) {
    //get all data from cache and send to user
    privatBank.buyEUR = myCache.get("PrivatBuyEUR");
    privatBank.sellEUR = myCache.get("PrivatSellEUR");
    if (privatBank.buyEUR == undefined) ExchangeRatesPrivatBank(); //if there is no data in cache, request it from api
    setTimeout(() => bot.sendMessage(chatId, `Privatbank:\nBuy: ${privatBank.buyEUR}\n Sell: ${privatBank.sellEUR}`), 1000);
}

function ExchangeRatesInUSDToGRNPrivateBank(chatId) {
    //get all data from cache and send to user
    privatBank.buyUSD = myCache.get("PrivatBuyUSD");
    privatBank.sellUSD = myCache.get("PrivatSellUSD");
    if (privatBank.buyEUR == undefined) ExchangeRatesPrivatBank(); //if there is no data in cache, request it from api
    setTimeout(() => bot.sendMessage(chatId, `Privatbank:\nBuy: ${privatBank.buyUSD}\n Sell: ${privatBank.sellUSD}`), 1000);
}

function ExchangeRatesInEURToGRNMonoBank(chatId) {
    //get all data from cache and send to user
    monoBank.buyEUR = myCache.get("MonoBuyEUR");
    monoBank.sellEUR = myCache.get("MonoSellEUR");
    if (privatBank.buyEUR == undefined) ExchangeRatesMonoBank(); //if there is no data in cache, request it from api
    setTimeout(() => bot.sendMessage(chatId, `Monobank:\nBuy: ${monoBank.buyEUR}\n Sell: ${monoBank.sellEUR}`), 1000);
}

function ExchangeRatesInUSDToGRNMonoBank(chatId) {
    //get all data from cache and send to user
    monoBank.buyUSD = myCache.get("MonoBuyUSD");
    monoBank.sellUSD = myCache.get("MonoSellUSD");
    if (privatBank.buyEUR == undefined) ExchangeRatesMonoBank(); //if there is no data in cache, request it from api
    setTimeout(() => bot.sendMessage(chatId, `Monobank:\nBuy: ${monoBank.buyUSD}\n Sell: ${monoBank.sellUSD}`), 1000);
}