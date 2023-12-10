const { SlashCommandBuilder } = require('@discordjs/builders');

// add banned word command
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Re-set a user\'s warning points')
        .addUserOption(option => 
            option.setName('target')
            .setDescription('The user whose points you want to re-set')
            .setRequired(true))
        .addIntegerOption(option => 
			option.setName('count')
			.setDescription('The count you want to set their points to. Will default to re-setting to 0.')),
	async execute(interaction) {
        const user = interaction.options.getUser('target');
        let count = interaction.options.getInteger('count');

        if (!(user.username in userCount)) {
            userCount[user.username] = 0;
        }
        if (count == null) {
            count = 0;
        }

        const oldCount = userCount[user.username];
        userCount[user.username] = count;
        interaction.reply(`${user.username} used to have a warning count of ${oldCount}. You re-set their count to ${count}.`);
	},
};
