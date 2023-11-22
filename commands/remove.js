const { SlashCommandBuilder } = require('@discordjs/builders');

// remove banned word command
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Remove a banned word from Vigil\'s list')
        .addStringOption(option => 
			option.setName('word')
			.setDescription('The word to remove from the banned list')
			.setRequired(true)),
	async execute(interaction) {
        let wordToRem = interaction.options.getString('word');
        wordToRem = wordToRem.toLowerCase();

        if (bannedWords.has(wordToRem)) {
            bannedWords.delete(wordToRem);
            interaction.reply(wordToRem + ' has been removed from the list of banned words!');
        } else {
            interaction.reply(wordToRem + ' is not currently in the list of banned words, so it cannot be removed.');
        }
	},
};
