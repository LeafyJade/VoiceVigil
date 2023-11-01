const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

// join VC command
module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Vigil leaves the voice channel you are in.'),
	async execute(interaction) {
        const voiceChannel = interaction.member?.voice.channel;
        
        if (voiceChannel) {
            const connection = getVoiceConnection(voiceChannel.guild.id); 
            connection.destroy();
            interaction.reply('Left the voice channel!');
        } else {
            interaction.reply('You need to be in a voice channel for this!');
        }
	},
};
