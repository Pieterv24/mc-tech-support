import { createRequire } from 'module';
import { Client, Intents } from 'discord.js';

const require = createRequire(import.meta.url);
const { token } = require('./config.json');

// Create new client instance
const client = new Client({ intents: [] });

// When client is ready tell me
client.once('ready', () => {
    console.log('Ready!');
});

// Login to discord with token
client.login(token);