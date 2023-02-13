const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR TELEGRAM BOT TOKEN';
const bot = new TelegramBot(token, { polling: true });

const fs = require('fs');
const path = require('path');

const process = require('process');
const program = require('commander');


bot.on('message', (msg) => {
    var chatId = msg.chat.id;
    if (msg.text === '/start') {  // create file for UserId
        fs.writeFile(path.join(__dirname, 'UserId.txt'), chatId.toString(), (err) => {
            if (err) throw err;
        });
    }
})

program
    .name('Telegram-Bot')
    .description('CLI to send message and photo to Telegram bot')
    .version('0.0.1');
//command to send message
program
    .command('send-message')
    .argument('<word>')
    .alias('m')
    .description('Send message to Telegram Bot')
    .action((word) => {
        fs.readFile(path.join(__dirname, 'UserId.txt'), 'utf-8', (err, data) => {
            if (err) throw err;
            bot.sendMessage(data, word);
            setTimeout(Exit, 500);
        })
    }
    )
//command to send photo
program
    .command('send-photo')
    .argument('<word>')
    .alias('p')
    .description('Send photo to Telegram Bot. Drag and drop it to console after p-lag.')
    .action((word) => {
        console.log(word);
        fs.readFile(path.join(__dirname, 'UserId.txt'), 'utf-8', (err, data) => {
            if (err) throw err;
            bot.sendPhoto(data, word);
            setTimeout(Exit, 500);
        })
    }
    )


program.parse(process.argv);

function Exit() {        //function to stop program
    process.exit(1);
}