import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { execSync } from 'child_process';
import config from '../config.json' assert { type: 'json' }

const { velocity_start, velocity_query } = config;

export const data = new SlashCommandBuilder()
    .setName("start")
    .setDescription("Start either the minecraft or velocity server")
    .addStringOption(option =>
        option.setName('server')
            .setDescription('what server to restart')
            .setRequired(true)
            .addChoice("Velocity", 'velocity-server')
            // .addChoice('Minecraft', 'minecraft-server')
    );

/**
 * @param {CommandInteraction} interaction 
 */
export const excecute = async (interaction) => {
    const server = interaction.options.getString('server');

    switch(server) {
        case 'velocity-server':
            await interaction.reply('Starting velocity server');
            const status = execSync(velocity_query);
            const velocity_running = status.toString().includes('velocity: 1 windows');

            if (!velocity_running) {
                const start = execSync(velocity_start);
                interaction.editReply()
                await interaction.editReply("Velocity server has started");
            } else {
                await interaction.editReply("Velocity server is already running");
            }
            break;
        case 'minecraft-server':
            interaction.reply('This command is not yet supported');
        default:
            interaction.reply('Unknown server');
    }
}