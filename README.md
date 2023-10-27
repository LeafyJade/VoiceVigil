# VoiceVigil

DO NOT, under ANY circumstances, commit/push the .env or config.json file provided. These are private and contain a key that cannot be shared for the bot. 

For first time setup, use your terminal to run: 
```
npm install discord.js13@npm:discord.js@13.16.0
```

We will be using Discord.js 13.16.0 for now, as there is the most documentation for it. 

Use: 
```
npm list discord.js
```
To check your Discord.js version. If you have multiple versions of Discord.js, this may return another value. You can check you have succesfully installed Discord.js 13 with: 
```
npm list discord.js13
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