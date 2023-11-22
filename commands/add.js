const { SlashCommandBuilder } = require('@discordjs/builders');

// add banned word command
module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Add a banned word to Vigil\'s list')
        .addStringOption(option => 
			option.setName('word')
			.setDescription('The word to add to the banned list')
			.setRequired(true)),
	async execute(interaction) {
        let wordToAdd = interaction.options.getString('word');
        wordToAdd = wordToAdd.toLowerCase();

        if (bannedWords.has(wordToAdd)) {
            interaction.reply(wordToAdd + ' is already in the list of banned words!');
        } else {
            bannedWords.add(wordToAdd);
            interaction.reply(wordToAdd + ' has been added to the list of banned words.');
        }
	},
};
