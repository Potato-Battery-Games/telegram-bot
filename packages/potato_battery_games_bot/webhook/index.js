const { Telegraf } = require("telegraf");
const { PostHog } = require("posthog-node");

const posthogClient = new PostHog(process.env.POSTHOG_API_KEY, {
  host: "https://eu.i.posthog.com",
});
const bot = new Telegraf(process.env.BOT_TOKEN);

// Bot commands
bot.start((ctx) => {
  posthogClient.capture({
    distinctId: "anonymous",
    event: "bot_started",
  });

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
  posthogClient.capture({
    distinctId: "anonymous",
    event: "games_command_used",
  });

  try {
    await ctx.reply("🎮 Try our new game: Glow Hook");
    await ctx.sendGame("GlowHook");
  } catch (error) {
    console.error("Error sending game:", error);
    await ctx.reply("Sorry, something went wrong. Please try again later.");
  }
});

bot.help((ctx) => {
  posthogClient.capture({
    distinctId: "anonymous",
    event: "help_command_used",
  });

  ctx.reply("We will be ready soon!");
});

bot.gameQuery((ctx) => {
  posthogClient.capture({
    distinctId: "anonymous",
    event: "game_query_received",
  });

  ctx.answerGameQuery(process.env.GLOW_HOOK_URL);
});

async function main(body) {
  posthogClient.capture({
    distinctId: "anonymous",
    event: "webhook_received",
  });

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
  } finally {
    await posthogClient.flush();
  }
}

exports.main = main;
