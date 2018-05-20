const botconfig = require("./botconfig.js");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({
	disableEveryone: true,
	fetchAllMembers: true
});
bot.counter = false;
bot.commands = new Discord.Collection();
bot.disabledCommands = [];
bot.rateLimits = { poll: [], report: [], afk: [] };
bot.databases = { disabled: [], prefixes: [] };

var loaders = [];
fs.readdirSync(__dirname + "/load").forEach(file => {
	loaders.push(require("./load/" + file));
});

function checkCommand(command, name) {
	var resultOfCheck = [true, null];
	if (!command.run) resultOfCheck[0] = false; resultOfCheck[1] = `Missing Function: "module.run" of ${name}.`;
	if (!command.help) resultOfCheck[0] = false; resultOfCheck[1] = `Missing Object: "module.help" of ${name}.`;
	if (command.help && !command.help.name) resultOfCheck[0] = false; resultOfCheck[1] = `Missing String: "module.help.name" of ${name}.`;
	return resultOfCheck;
}

fs.readdir("./commands/", (err, files) => {
	if (err) console.log(err);
	var jsfiles = files.filter(f => f.split(".").pop() === "js");
	if (jsfiles.length <= 0) return console.log("Couldn't find commands.");
	jsfiles.forEach((f, i) => {
		try {
			var props = require(`./commands/${f}`);
			if (checkCommand(props, f)[0]) {
				bot.commands.set(props.help.name, props);
			} else {
				throw checkCommand(props, f)[1];
			}
		} catch(err) {
			disabledCommands.push(f);
			console.log(`\nThe ${f} command failed to load:`);
			console.log(err);
		}
	});
});

bot.on("ready", async () => {
	console.log(`${bot.user.tag} is online. ${bot.commands.size}/${bot.commands.size + bot.disabledCommands.length} commands loaded successfully.`);
	loaders.forEach(loader => {
		if (loader.run != null) loader.run(bot);
	});
});

bot.on("message", async message => {
	if (message.channel.type !== "dm" && !message.author.bot) {
		let cmd = message.content.split(" ")[0].toLowerCase();
		if (cmd != null) {
			let args = message.content.split(" ").slice(1);
			let content = args.join(" ");
			let dbguild = bot.guilds.get("443929284411654144");
			let channels = dbguild.channels.filter(m => RegExp("wbotprefixes-database", "gi").test(m.name));
			var prefix = bot.databases.prefixes.find(value => value.guild === message.guild.id);
			if (prefix != null) prefix = prefix.prefix;
			else prefix = botconfig.prefix;
			if (message.isMemberMentioned(bot.user) && message.content.endsWith("prefix")) return message.reply(`My prefix is \`${prefix}\``);
			if (message.content.startsWith(prefix)) {
				var commandfile = false;
				bot.commands.forEach(command => {
					let aliases = command.help.aliases;
					if (aliases == undefined) aliases = [];
					aliases.push(command.help.name);
					if (aliases.includes(cmd.slice(prefix.length))) commandfile = command;
				});
				if (commandfile) {
					var disabled = bot.databases.disabled.find(value => value.guild === message.guild.id);
					var disableCheck = false;
					disableCheck = (disabled == null) ? false : true;
					if (disableCheck) disableCheck = (disabled.commands.includes(cmd.slice(prefix.length))) ? true : false;
					if (!disableCheck) {
						commandfile.run(bot, message, args, prefix, content);

					} else message.reply("This command is disabled by an admin in this server!");
				}
			}
		}

	}
});
bot.login(botconfig.token);
