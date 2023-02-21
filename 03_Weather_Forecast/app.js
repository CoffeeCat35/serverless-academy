const axios = require('axios');

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = 'YOUR TELEGRAM BOT TOKEN';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

//start command
bot.setMyCommands([
    { command: '/start', description: 'Request a weather forecast' }
])

//start menu's buttons
const ForecastInPenrithAndExchangeRates = {
    reply_markup: {
        "keyboard":
            [
                [{ text: 'Forecast in Penrith', callback_data: 'ForecastInPenrith' }]
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
        SendMessageWithWeatherDataWithInterval(chatId, 3);
    }
    else if (msg.text === 'At intervals of 6 hours') { //if user pressd 'At intervals of 6 hours' clear last interval and set inteval in 6 hours
        SendMessageWithWeatherDataWithInterval(chatId, 6);
    }
    else { //if user write something then send message about error
        return bot.sendMessage(chatId, "Sorry, I can't understand you, try again!)");
    }
})

function SendMessageWithWeatherDataWithInterval(chatId, TimeInterval) {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Penrith&appid=8bcf7b1c359b8d0ef12bea8694cb66d4`).then(resp => {
        let dataAbouWeatherInHoursInterval = 'In the city of Pernit';
        //claim all data about weather and clear it

        let lastDate = resp.data.list[0].dt_txt.split(' ');
        dataAbouWeatherInHoursInterval += `\n\n${lastDate[0]}`;
        for (let i = 0; i < resp.data.list.length;) {
            let temp = Math.floor(resp.data.list[i].main.temp - 273.15);
            let feelsLike = Math.floor(resp.data.list[i].main.feels_like - 273.15);
            let currentDate = resp.data.list[i].dt_txt.split(' ');
            let clouds = resp.data.list[i].weather[0].description;

            if (lastDate[0] != currentDate[0]) {
                dataAbouWeatherInHoursInterval += `\n\n${currentDate[0]}`;
                lastDate = currentDate;
            }

            dataAbouWeatherInHoursInterval += `\n${currentDate[1]} The air temperature is ${temp} degree Celsius, feels like ${feelsLike}, ${clouds}`;
            i += TimeInterval / 3;
        }
        //send message with forecast to user
        return bot.sendMessage(chatId, dataAbouWeatherInHoursInterval);
    })
}