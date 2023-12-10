const { SlashCommandBuilder } = require('@discordjs/builders');

function rtrim(x, characters) {
    var start = 0;
    var end = x.length - 1;
    while (characters.indexOf(x[end]) >= 0) {
      end -= 1;
    }
    return x.substr(0, end + 1);
}

// add banned word command
module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('See Vigil\'s banned words list'), 
	async execute(interaction) {
        let list = ""
        for (const word of bannedWords) {
            list = list + word + ", "
        }
        list = rtrim(list, ", ");
        if (list == "") {
            interaction.reply("Vigil\'s banned word list currently contains no banned words.")
        } else {
            for (let i = 0; i < list.length; i++) {
                if (list.charAt(i) == "*") {
                    list = list.slice(0, i) + "\\" + list.slice(i);
                    i++;
                }
            }
            interaction.reply(list);
        }
	},
};
