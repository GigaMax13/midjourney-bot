import { REST, Routes } from "discord.js";

import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, APPLICATION_ID } = process.env;

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN!);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(APPLICATION_ID!), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}

import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply(
      "/image a cyborg t-rex with a lasergun, synthwave vector tshirt design, wide angle shot"
    );
  }
});

client.login(DISCORD_TOKEN);
