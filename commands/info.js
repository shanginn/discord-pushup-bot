const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get info about a user or a server!')
    .addSubcommand(subcommand =>
        subcommand
            .setName('user')
            .setDescription('Info about a user')
            .addUserOption(option => option.setName('target').setDescription('The user')))
    .addSubcommand(subcommand =>
        subcommand
            .setName('server')
            .setDescription('Info about the server'));

module.exports = {
    data,
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'user':
                const user = interaction.options.getUser('target');
                await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
                break;
            case 'server':
                await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
                break;
            default:
                await interaction.reply({ content: 'Something went wrong!', ephemeral: true });
        }
    },
};
