# VoiceVigil

DO NOT, under ANY circumstances, commit/push the .env or config.json file provided. These are private and contain a key that cannot be shared for the bot. 

For first time setup, use your terminal to run: 
```
npm install discord.js
```

The Discord API can be found here: https://discord.js.org/#/docs/discord.js/stable/general/welcome

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