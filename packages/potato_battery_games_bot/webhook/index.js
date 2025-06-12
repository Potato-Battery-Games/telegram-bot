const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

// Bot commands
bot.start((ctx) => {
    ctx.reply('👋 Hello! I am Potato Battery Games Bot. I am here to help you play ourgames.')
})

async function main(body) {
    try {
        // Process the webhook update
        await bot.handleUpdate(body)
        return {
            statusCode: 200,
            body: 'OK'
        }
    } catch (error) {
        console.error('Error handling webhook:', error)
        return {
            statusCode: 500,
            body: 'Internal Server Error'
        }
    }
}

exports.main = main