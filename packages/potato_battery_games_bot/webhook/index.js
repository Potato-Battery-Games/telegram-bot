const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

// Bot commands
bot.start((ctx) => {
  ctx.reply(
    `👋 Hello! I am Potato Battery Games Bot. I am here to help you play our games.\n\nCurrently we are preparing for the launch of our first game, so stay tuned!\n\nYou can follow us on Telegram: @potato_battery`
  );
});

bot.command("/games", (ctx) => {
  ctx.reply("🎮 Try our new game: Glow Hook");
  ctx.sendGame("GlowHook");
});

bot.gameQuery((ctx) => {
  ctx.answerGameQuery(process.env.GLOW_HOOK_URL);
});
async function main(body) {
  try {
    // Process the webhook update
    await bot.handleUpdate(body);
    return {
      statusCode: 200,
      body: "OK",
    };
  } catch (error) {
    console.error("Error handling webhook:", error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
}

exports.main = main;
