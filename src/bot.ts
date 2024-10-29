import { ChannelType, Client, IntentsBitField, Events } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, SERVER_NAME, SERVER_CHANNEL } = process.env;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}`);

  const permissions = ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"];

  const inviteLink = `https://discord.com/oauth2/authorize?client_id=${
    client.user?.id
  }&scope=bot&permissions=${permissions.join("%20")}`;

  console.log(`Invite link: ${inviteLink}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author === client.user) {
    return;
  }

  console.log(message.content);

  if (message.content.startsWith("!send_message")) {
    // Get the message content after the !send_message command
    const messageContent = message.content.substring("!send_message ".length);

    // Find your personal user's Discord server
    const server = client.guilds.cache.find((s) => s.name === SERVER_NAME);

    // Find your personal user's Discord channel in the server
    const channel = server?.channels.cache.find(
      (c) => c.name === SERVER_CHANNEL
    );

    // Send the message as your personal user
    if (channel?.type === ChannelType.GuildText) {
      // Send the message as your personal user
      await channel.send(messageContent);
    }
  }
});

client.login(DISCORD_TOKEN);
