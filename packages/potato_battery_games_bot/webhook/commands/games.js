async function games(ctx) {
  try {
    await ctx.reply("🎮 Try our new game: Glow Hook");
    await ctx.sendGame("GlowHook");
  } catch (error) {
    console.error("Error sending game:", error);
    await ctx.reply("Sorry, something went wrong. Please try again later.");
  }
}

module.exports = {
  games,
};
