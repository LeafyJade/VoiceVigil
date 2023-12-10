# VoiceVigil

DO NOT, under ANY circumstances, commit/push the .env, config.json, or gspeech.json file provided. These are private and contain a key that cannot be shared for the bot. 

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

The Discord API can be found here: https://discord.js.org/#/docs/discord.js/stable/general/welcome, though I believe these documents are for Discord.js13. I will add more information when I can. 

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