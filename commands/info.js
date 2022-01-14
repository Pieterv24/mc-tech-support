import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { execSync } from 'child_process';
import config from '../config.json' assert { type: 'json' }

const { velocity_query } = config;

export const data = new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get status of the server");

/**
 * @param {CommandInteraction} interaction 
 */
export const excecute = async (interaction) => {
    const velocity = execSync(velocity_query);
    console.log(velocity.toString());

    const velocity_running = velocity.toString().includes('velocity: 1 windows');

    interaction.reply(`Velocity is ${velocity_running ? 'running' : 'not running'}`);
}