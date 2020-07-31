module.exports = {
	name: 'purge',
	aliases: ['delete', 'pu'],
	description: "Deletes multiple messages at once.",
	usage: '<amount>',
	requires: 'MANAGE_MESSAGES',
	minArgs: 1,
	guildOnly: true,
	async run(message, [amount]) {
		// Delete the command message.
		message.delete();

		// Get the amount of messages to delete, max it out at 100.
		const msgs = Math.min(amount, 100);

		// Delete the messages.
		await message.channel.bulkDelete(msgs)

		// Send a confirmation and delete it after 1 second.
		const embed = tools.embed('Success')
		.setTitle(`Deleted ${msgs} messages`);
		const reply = message.channel.send(embed);
		reply.delete({timeout: 1000});
	}
}