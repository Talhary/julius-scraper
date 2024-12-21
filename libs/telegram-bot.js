import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import fs from "fs";
import { CreateChat } from "./create-chat.js";
import { ChatGpt4o } from "./chat.js";
import express from "express";
const port = process.env.PORT || 5000;
const app = express();
app.listen(port);fsd
setInterval(() => {
  try {
    fetch(process.env.URL);
  } catch (error) {}
}, 20000);
// Replace 'YOUR_BOT_TOKEN_HERE' with the token you get from BotFather.
const botToken = process.env.BOT_TOKEN;

// Create a new bot instance
const bot = new TelegramBot(botToken, { polling: true });

// Set commands for the bot
bot.setMyCommands([
  { command: "/start", description: "Start the bot and get a welcome message" },
  { command: "/reset", description: "Reset the history" },
  { command: "/info", description: "Get information about the bot" },
  { command: "/owner", description: "Know about the owner of this bot" },
  { command: "/details", description: "Get detailed bot functionality" },
  { command: "/support", description: "Reach out for support" },
]);

// Function to simulate "typing" before sending a message
const sendTyping = async (chatId) => {
  await bot.sendChatAction(chatId, "typing"); // Simulates typing
  return new Promise((resolve) => setTimeout(resolve, 1000)); // Simulates a delay
};

// Handle `/start` command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received /start command from chat ${chatId}`);
  await sendTyping(chatId);
  bot.sendMessage(
    chatId,
    `👋 Hello! Welcome to the bot. How can I help you today?`
  );
});
bot.onText(/\/reset/, async (msg) => {
  const chatId = msg.chat.id;
  //   console.log(`Received /start command from chat ${chatId}`);
  if (!fs.existsSync("./state.json")) {
    fs.writeFileSync("./state.json", JSON.stringify([]));
  }

  // Load users from state.json
  const users = JSON.parse(
    fs.readFileSync("./state.json", { encoding: "utf-8" })
  );

  // Find the user by chatId

  let user = users.find((el) => el?.id === chatId);
  if (!user) {
    bot.sendMessage(
      chatId,
      `👋 Hello! Welcome to the bot. Chat has already been cleared`
    );
    return;
  }
  fs.writeFileSync(
    "./state.json",
    JSON.stringify(users.filter((el) => el.id !== user?.id))
  );
  console.log(user);
  bot.sendMessage(chatId, `👋 Hello! Old chat has been cleared`);
});
// Handle `/info` command
bot.onText(/\/info/, async (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received /info command from chat ${chatId}`);
  await sendTyping(chatId);
  bot.sendMessage(
    chatId,
    `ℹ️ This bot is created to showcase basic response functionality. Use other commands to learn more.`
  );
});

// Handle `/owner` command
bot.onText(/\/owner/, async (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received /owner command from chat ${chatId}`);
  await sendTyping(chatId);
  bot.sendMessage(
    chatId,
    `🤖 The bot is maintained and developed by *Your Name or Team*`,
    { parse_mode: "Markdown" }
  );
});

// Handle `/details` command
bot.onText(/\/details/, async (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received /details command from chat ${chatId}`);
  await sendTyping(chatId);
  bot.sendMessage(
    chatId,
    `🛠️ This bot demonstrates:\n1. Command handling\n2. User interaction\n3. Typing effects.`
  );
});

// Handle `/support` command
bot.onText(/\/support/, async (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received /support command from chat ${chatId}`);
  await sendTyping(chatId);
  bot.sendMessage(
    chatId,
    `📞 For support, contact us at: support@example.com.`
  );
});

// Handle all non-command text
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  // Ignore commands in this handler
  if (msg.text.startsWith("/")) return;

  // Ensure state.json exists
  if (!fs.existsSync("./state.json")) {
    fs.writeFileSync("./state.json", JSON.stringify([]));
  }

  // Load users from state.json
  const users = JSON.parse(
    fs.readFileSync("./state.json", { encoding: "utf-8" })
  );

  // Find the user by chatId

  let user = users.find((el) => el?.id === chatId);
  console.log(user);
  let conversationId = null;
  console.log("new user");
  if (!user) {
    // New user
    const { id } = await CreateChat();
    console.log(id);
    conversationId = id;
    users.push({ id: chatId, conversationId });
    console.log(`New conversation ID: ${conversationId}`);
    fs.writeFileSync("./state.json", JSON.stringify(users, null, 2), {
      encoding: "utf-8",
    });
    ChatGpt4o(conversationId, msg.text, bot, chatId);

    // return bot.sendMessage(chatId, "New user added.");
  } else {
    // Existing user
    conversationId = user.conversationId;
  }

  console.log(`Received message: "${msg.text}" from chat ${chatId}`);
  await sendTyping(chatId);

  //   bot.sendMessage(chatId, `You said: "${msg.text}"`);
  ChatGpt4o(conversationId, msg.text, bot, chatId);
});

// Log bot status
bot.on("polling_error", (error) => {
  console.error("Polling error:", error);
});

console.log("Telegram bot is up and running...");
