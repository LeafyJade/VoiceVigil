const fs = require('node:fs');
const path = require('node:path');
const Discord = require('discord.js');
const { joinVoiceChannel } = require("@discordjs/voice");
const { addSpeechEvent, SpeechEvents } = require("discord-speech-recognition");
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');  
const { token } = require('./config.json');

const myIntents = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildBans,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.GuildPresences,
	GatewayIntentBits.DirectMessages,
];
const client = new Client({ intents: myIntents });
addSpeechEvent(client);
// User List to store the times they said a banned word
global.userCount = {}

// Banned words list
const bannedWords = new Set();
bannedWords.add("bubbles");
bannedWords.add("s***");
bannedWords.add("f***");
bannedWords.add("f*"); // fucker
bannedWords.add("ass");
bannedWords.add("a**"); // asshole
bannedWords.add("motherfuker");
bannedWords.add("b**"); // bitch
bannedWords.add("bastard");
bannedWords.add("damn");

// SPEECH TRANSCRIPTION 
client.on(SpeechEvents.speech, (msg) => {
	// If bot didn't recognize speech, content will be empty
	if (!msg.content) {
		return;
	}
	
	const channel = client.channels.cache.find(channel => channel.id === "1169407845838630923"); // hardcoded transcription text channel ID.
	const warning_channel = client.channels.cache.find(channel => channel.id === "1175147876456861756"); // harded coded warning channel for users to see their mess-ups. 
	channel.send(msg.author.username + ": " + msg.content);
	// msg.author.send(msg.content);

	// Convert message to array by splitting
	const messageArray = msg.content.split(" ");
	for (let i = 0; i < messageArray.length; i++) {
		// Convert each word to lowercase for comparison
		messageArray[i] = messageArray[i].toLowerCase();

		if (bannedWords.has(messageArray[i])) { // Detect if word is in banned list
			
			const member = msg.guild.members.cache.get(msg.author.id);
			if (!(msg.author.username in userCount)) {
				userCount[msg.author.username] = 0;
			}

			if (userCount[msg.author.username] == 0){
				warning_channel.send(msg.author.toString() + ", you said " + messageArray[i] + ", which is flagged as a bad word. You have been warned, and will be muted if you repeat this offence. You may appeal this with a moderator.");
				channel.send(msg.author.username + " said this banned word: " + messageArray[i] + ". This is a first warning.");
				userCount[msg.author.username] = userCount[msg.author.username] + 1;
			} else if (userCount[msg.author.username] == 1){
				member.voice.setMute(true).then(()=>{
					warning_channel.send(msg.author.toString() + ", you said " + messageArray[i] + ", which is flagged as a bad word. You have been muted, and will be kicked from the voice channel if you repeat this offence. You require a moderator to unmute you.");
					channel.send(msg.author.username + " said this banned word: " + messageArray[i] + ". This is a second warning. The user has been muted.");
					userCount[msg.author.username] = userCount[msg.author.username] + 1;
				})
			} else if (userCount[msg.author.username] == 2){
				member.voice.setMute(true);
				member.voice.disconnect().then(()=>{
					warning_channel.send(msg.author.toString() + ", you said " + messageArray[i] + ", which is flagged as a bad word. You have been kicked from the voice channel and muted, and will be kicked from the server if you repeat this offence. You require a moderator to unmute you.");
					channel.send(msg.author.username + " said this banned word: " + messageArray[i] + ". This is a third warning. The user has been kicked from the voice channel and muted.");
					userCount[msg.author.username] = userCount[msg.author.username] + 1;
				})
			} else if (userCount[msg.author.username] == 3){
				member.kick().then(()=>{
					msg.author.send(msg.author.username + ", you said " + messageArray[i] + ", which is flagged as a bad word. Since this was your fourth warning, you have been kicked from the server. You may re-join the server, but will be banned if you have another offence. You may appeal this with a moderator to reset your warnings.");
					channel.send(msg.author.username + " said this banned word: " + messageArray[i] + ". This is a fourth warning. The user has been kicked from the server."); 
					userCount[msg.author.username] = userCount[msg.author.username] + 1;
				})
			} else {
				member.ban().then(()=>{
					msg.author.send(msg.author.username + ", you said " + messageArray[i] + ", which is flagged as a bad word. Since this was your fifth warning, you have been banned from the server. You may attempt to appeal this with a moderator if you wish to re-join again.");
					channel.send(msg.author.username + " said this banned word " + messageArray[i] + ". This has been the user's fifth offense. The user has been banned from the server.");
				})
			}
			break;
		}
	}
});

// add Event handlers
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// add Command Handler
client.commands = new Discord.Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// for command recognition
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

console.log('Powering Up Vigil...');

// Start the bot
client.login(token);
