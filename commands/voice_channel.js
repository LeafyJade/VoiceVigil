const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice')
const { getVoiceConnection } = require('@discordjs/voice');

//ping pong command
module.exports = {
	data: new SlashCommandBuilder()
		.setName('join') 
		.setDescription('Bot joins a voice channel for moderation.'),
	async execute(message) {
        try {
		    const guildMap = new Map();
		    if (!('guild' in message) || !message.guild) return; // prevent private messages to bot
		    const mapKey = message.guild.id;
            if (!message.member.voice.channel.id) {
                message.reply('Error: please join a voice channel first.')
            } else {
            //Nicki added const connection
            console.log("two")
            if (!guildMap.has(mapKey)) {
                const connection = joinVoiceChannel({
                    channelId: message.member.voice.channel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                    selfDeaf: false,
                });
            }
            else
                message.reply('Already connected')
                console.log("three")
            }
            console.log("four")
            const connection = getVoiceConnection(message.member.voice.channel.guild.id);
            guildMap.set(mapKey, {
                'text_Channel': message.channel.id,
                'voice_Channel': message.member.voice.channel.id,
                'voice_Connection': connection,
                'selected_lang': 'en',
                'debug': false,
            });
            console.log("five");
            message.reply('connected!');
        } catch (e) {
            console.log('connect: ' + e);
            message.reply('Error: unable to join your voice channel.');
            throw e;
        }
    },
};
