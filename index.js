import { readdirSync } from 'fs';
import { Client, Collection } from 'discord.js';
import config from './config.json' assert { type: 'json'};

// Create new client instance
const client = new Client({ intents: [] });

client.commands = new Collection();
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// When client is ready tell me
client.once('ready', () => {
    console.log('Ready!');
    const scopes = ["bot", "applications.commands"];
    console.log(`Invite with url: https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=0&scope=${encodeURIComponent(scopes.join(' '))}`);
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.excecute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: "There was an error while executing this command!", ephemeral: true });
    }

    return;
});

// Login to discord with token
client.login(config.token);