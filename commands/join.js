const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require("@discordjs/voice");

// join VC command
module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Vigil joins a voice channel you are connected to, in order to moderate.'),
	async execute(interaction) {
        const voiceChannel = interaction.member?.voice.channel;

        if (voiceChannel) {
            joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                selfDeaf: false,
            });
            interaction.reply('Connected to your voice channel!');
        } else {
            interaction.reply('Please join a voice channel first!');
        }
	},
};
