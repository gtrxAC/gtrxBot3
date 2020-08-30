const tools = require('../tools');

module.exports = {
	name: 'ban',
	category: 'Moderation',
	aliases: ['b'],
	description: "Bans a user from the server.",
	usage: '<user> [reason] [deletedays]',
	requires: 'BAN_MEMBERS',
	minArgs: 1,
	guildOnly: true,
	async run(message, [user, ...reason]) {
		// Use a placeholder if no reason was given.
		if (!reason.length) reason = ['(no', 'reason', 'specified)'];

		// If the last arg is a number, use it as the number of days to delete messages.
		const lastArgNumber = parseInt(reason[reason.length - 1]);
		if (isFinite(lastArgNumber)) days = parseInt(reason.pop());
		
		// Find the target user from mentions, or find by nick/username.
		let target = message.mentions.members.first()
		|| message.guild.members.cache.find(m => m.user.id === user
		|| m.user.tag.startsWith(user)
		|| m.displayName.startsWith(user));
		
		// If no user was found, exit.
		if (!target) return tools.error(message, 'Invalid user or no user mentioned');

		// If the user's top role isn't higher than the target's, exit.
		if (message.member.roles.highest.position <= target.roles.highest.position)
			return tools.error(message, 'You cannot ban this user.')

		// Ban the user and send a confirmation or error message.
		await target.ban({
			reason: `${message.author.tag}: ${reason.join(' ')}`,
			days: days | 0
		})
		.then(() => {
			message.channel.send(tools.embed('Success')
			.setDescription(`Banned ${target}`));
		})
		.catch(err => {
			tools.error(message, `Failed to ban - make sure I have permission.`);
		})
	}
}