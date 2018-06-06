module.exports.run = (bot) => {
	bot.getPermissionLevel = function(user) {
		var guild = bot.guilds.get("410400562232819723");
		var permissionLevel = 0;
		if (guild.members.has(user.id)) {
			var newMember = guild.member(user.id);
			if (newMember.roles) {
				if (newMember.roles.has("410546480307503124")) permissionLevel = 1;
				if (newMember.roles.has("428563903937511426")) permissionLevel = 2;
				if (newMember.roles.has("410611296401358848")) permissionLevel = 3;
				if (newMember.roles.has("428283053828341783")) permissionLevel = 4;
				if (newMember.roles.has("410608939139334184")) permissionLevel = 5;
				if (newMember.roles.has("410481036162760722")) permissionLevel = 6;
			}
		}
		if (user.id === "303683211790254080") permissionLevel = 7;
		if (user.id === "399975738008141824") permissionLevel = 8;
		return permissionLevel;
		/*Permission Guide
		0 = Non-newMember or Non-Matching Roles
		Roles:
		1 = Moderators
		2 = Tech Admin
		3 = Admin
		4 = Head Admin
		5 = Co-Owner
		6 = Main Owner
		Users:
		7 = Mattify
		8 = Windows
		*/
	}
};
