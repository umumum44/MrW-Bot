const botconfig = require("./botconfig.js");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({
	disableEveryone: true,
	fetchAllMembers: true
});
bot.counter = false;
bot.commands = new Discord.Collection();
bot.disabledCommands = new Discord.Collection();
bot.rateLimits = { poll: [], report: [], afk: [] };
bot.databases = { disabled: [], prefixes: [] };

var loaders = [];
fs.readdirSync(__dirname + "/load").forEach(file => {
	loaders.push(require("./load/" + file));
});

var messageLoaders = [];
fs.readdirSync(__dirname + "/messageload").forEach(file => {
	loaders.push(require("./messageload/" + file));
});

fs.readdir("./commands/", (err, files) => {
	if (err) return console.log(err);
	let jsfile = files.filter((f) => f.split(".").pop() === "js")
	if (jsfile.length <= 0) return console.log("Couldn't find commands.");
	jsfile.forEach((f) => {
		let props = require(`./commands/${f}`);
		if (props.run && props.help) {
			if (props.help.name) {
				bot.commands.set(props.help.name, props);
			} else {
				console.log(`The ${f} command failed to load.`);
				disabledCommands.set(f, props);
			}
		} else {
			console.log(`The ${f} command failed to load.`);
			disabledCommands.set(f, props);
		}
	});
});

bot.on("ready", async () => {
	console.log(`${bot.user.tag} is online. ${bot.commands.size}/${bot.commands.size + bot.disabledCommands.size} commands loaded successfully.`);
	loaders.forEach(loader => {
		if (loader.run != null) loader.run(bot);
	});
});

bot.on("message", async message => {
	if (message.channel.type === "dm") return;
	if (message.author.bot) return;
	let mention = message.mentions.members.first();
	var checker;
	if (mention) {
		checker = bot.rateLimits.afk.find(value => value.user === mention.id);
		if (checker) if (checker.user !== message.author.id)
			message.reply(`This user is currently AFK!\nAFK Message: \`${checker.reason}\``).then(msg => msg.delete(5000));
	}
	checker = bot.rateLimits.afk.find(value => value.user === message.author.id);
	if (checker) {
		bot.rateLimits.afk.splice(bot.rateLimits.afk.indexOf(checker), 1);
		message.reply("Welcome back! Your AFK status was removed.").then(msg => msg.delete(5000));
	}
	let cmd = message.content.split(" ")[0].toLowerCase();
	if (!cmd) return;
	let args = message.content.split(" ").slice(1);
	let content = args.join(" ");
	let dbguild = bot.guilds.get("443929284411654144");
	let channels = dbguild.channels.filter(m => RegExp("wbotprefixes-database", "gi").test(m.name));
	var prefix = bot.databases.prefixes.find(value => value.guild === message.guild.id);
	if (prefix != null) prefix = prefix.prefix; else prefix = botconfig.prefix;
	if (message.isMemberMentioned(bot.user) && message.content.endsWith("prefix")) return message.reply(`My prefix is \`${prefix}\``);
	if (message.isMemberMentioned(bot.user) && message.content.endsWith("prefix reset") && message.member.hasPermission("MANAGE_GUILD")) {
		let aaa = dbguild.channels.filter(m => RegExp("wbotprefixes-database", "gi").test(m.name));
		aaa.forEach(chl => {
			chl.fetchMessages({ limit: 100 }).then(msgs => {
				msgs.forEach(msg => {
					if (msg.content.startsWith(`${message.guild.id}`)) {
						msg.delete();
					}
				});
			});
		});
		message.react("\u2705");
	}
	if (!message.content.startsWith(prefix)) return;
	var commandfile = false;
	bot.commands.forEach(command => {
		let aliases = command.help.aliases;
		if (aliases == undefined) aliases = [];
		aliases.push(command.help.name);
		if (aliases.includes(cmd.slice(prefix.length))) commandfile = command;
	});
	if (!commandfile) return;
	var disabled = bot.databases.disabled.find(value => value.guild === message.guild.id);
	var disableCheck = false;
	disableCheck = (disabled == null) ? false : true;
	if (disableCheck) disableCheck = (disabled.commands.includes(cmd.slice(prefix.length))) ? true : false;
	if (disableCheck) return message.reply("This command is disabled by an admin in this server!")
	return commandfile.run(bot, message, args, prefix, content);
});
bot.login(botconfig.token);
