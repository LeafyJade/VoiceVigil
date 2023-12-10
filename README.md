# VoiceVigil

Voice Vigil is a voice channel moderation bot that detects banned words, proceeds to give users warnings, mute users, remove users from voice channels, and kick or ban users from a server, depending on how many times they have already been reprimanded and severity of their actions. The bot will also transcribe voice chats in a given admin text channel to be available for review, noting who said what. Vigil also comes with a handful of commands—a join and leave command to join and leave voice channels, an add and remove commands to add or remove words from its list of banned words, a list command to view the list of banned words, and a reset command to manually reset a user's warning points to a certain amount determined by an admin. 

# Features to be implemented

Currently, anyone can execute any of Vigil's commands. However, it is pretty obvious that normal users should not be able to remove Vigil from a voice channel, nor should they be able to edit the list of banned words or re-set warning points. This can be done by adding a check for conditions of roles or powers a user who executes a command has. 

We also want to add a heirarchy system for words, where certain words that are deemed more severe count for more warning points. 

Our code currently hardcodes channel IDs for transcription and warning channels. these IDs are, of course, only relevant to the specific test server we used to develop Vigil. In the future, setting up a transcription and warning channel should be done via bot commands. 

# How to set up your own Vigil

This bot requires a config.json file with your bot's token and client ID. 

For first time setup, use your terminal to run the following two commands: 
```
npm install discord.js

npm i discord-speech-recognition
```

Use: 
```
npm list discord.js
```
To check your Discord.js version. The version should be Discord.js 14.13.0 or something similar. 

To update /text commands, run this in your terminal: 
```
node deploy-commands.js
```

To run the Voice Vigil bot (please first check if it is already online, in which case you do not need to do this), run: 
```
node main.js
```

The commands folder is for text commands, which start with /. 
The events folder is for recognizing events without a command, and reacting to them. 
main.js holds instructions to set up all commands and events.