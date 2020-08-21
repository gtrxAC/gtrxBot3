const tools = require("../tools");

module.exports = {
	name: 'calc',
	aliases: ['math'],
	description: "Calculates a mathematical expression.",
	usage: '<expression>',
	minArgs: 1,
	async run(message, [...expression]) {
		expression = expression.join(' ');

		// Don't allow evaluating anything other than mathematical expressions.
		if (/[^0-9+\-/*<>=!&|^()]+/g.test(expression))
			return tools.error(message, 'Syntax error');

		// Evaluate the expression and return the result.
		return tools.embed('Success')
		.setDescription(eval(expression));
	}
}