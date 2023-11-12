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
// User List to store the times that said baned word
global.userCount = {}

// Banned words list
const bannedWords = new Set();
bannedWords.add("bubbles");
bannedWords.add("s***");
bannedWords.add("f***");

// SPEECH TRANSCRIPTION 
client.on(SpeechEvents.speech, (msg) => {
	// If bot didn't recognize speech, content will be empty
	if (!msg.content) {
		return;
	}
	
	const channel = client.channels.cache.find(channel => channel.id === "1169407845838630923"); // hardcoded transcription text channel ID
	channel.send(msg.author.username + ": " + msg.content);
	// msg.author.send(msg.content);
  
  // Convert message to array by splitting
  const messageArray = msg.content.split(" ");
  for (let i = 0; i < messageArray.length; i++) {
    // Convert each word to lowercase for comparison
    messageArray[i] = messageArray[i].toLowerCase();
    if (bannedWords.has(messageArray[i])) {
      // Detect if word is in banned list
	  const member = msg.guild.members.cache.get(msg.author.id);
      if(userCount[msg.author.username]==0){
		member.voice.setMute(true).then(()=>{
			channel.send(msg.author.username + " said banned word " + messageArray[i] +" firstly, has been muted");
			userCount[msg.author.username]= userCount[msg.author.username]+1;
		})
	  }
	  else if(userCount[msg.author.username]==1){
		member.kick().then(()=>{
			channel.send(msg.author.username + " said banned word " + messageArray[i] +" secondly, has been kicked");
			userCount[msg.author.username]= userCount[msg.author.username]+1;
	  })
	}
	  else {
		member.kick().then(()=>{
			channel.send(msg.author.username + " said banned word " + messageArray[i] +" thirdly, has been banned");
	  })
	  //channel.send(msg.author.username + " said banned word " + messageArray[i] +"!");
      //console.log(msg.author.username + " said banned word " + messageArray[i] +"!");
    }
	break;
  }
}
}
);

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
