const tools = require('../tools');

module.exports = {
	name: 'eval',
	aliases: ['ev'],
	description: "Runs JavaScript code.",
	usage: '<code ...>',
	ownerOnly: true,
	async run(message, args) {
		return tools.embed('Success')
		.setDescription(eval(args.join(' ')));
	}
}