module.exports = {
	name: 'messageCreate',
	execute(message) {
		let msg = message.content.toLowerCase();
		if(!message.author.bot) {
			if(msg.includes("bubbles")) {
				message.channel.send("Bubbles is a bad word, " + message.author.username + "!");
			}
		}
	},
};