const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

// Bot commands
bot.start((ctx) => {
  ctx.reply(
    `👋 Hello! I am Potato Battery Games Bot. I am here to help you play our games.\n\nYou can also follow us on Telegram: @potato_battery`
  );
  ctx.reply("Available commands:", {
    reply_markup: {
      inline_keyboard: [[{ text: "🎮 Games", callback_data: "games" }]],
    },
  });
});

bot.command("games", async (ctx) => {
  try {
    await ctx.reply("🎮 Try our new game: Glow Hook");
    await ctx.sendGame("GlowHook");
  } catch (error) {
    console.error("Error sending game:", error);
    await ctx.reply("Sorry, something went wrong. Please try again later.");
  }
});

bot.help(Telegraf.reply("We will be ready soon!"));

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
