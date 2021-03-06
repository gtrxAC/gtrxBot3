const tools = require('../tools');

module.exports = {
	name: 'choose',
	category: 'Utility',
	aliases: ['ch'],
	description: "Chooses one of the given options.",
	usage: '<choice1> , <choice2> , [...]',
	minArgs: 1,
	async run(message, args) {
		// Split the arguments by commas.
		args = args.join(' ').split(/ *, */g);

		// Choose a random choice from the arguments.
		const choice = args[Math.floor(Math.random() * args.length)];

		if (args.length < 2)
			throw new Error("Only one choice specified (try separating by commas)");

		// Send an embed with the choice.
		return tools.embed('Random Choice')
			.setDescription(
				`**Choices:** \`${args.join('` `')}\`\n` +
				`**Result:** \`${choice}\``
			);
	}
}