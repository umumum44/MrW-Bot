const botconfig = require("./botconfig.js");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({
	disableEveryone: true,
	fetchAllMembers: true
});

var loaders = [];
fs.readdirSync(__dirname + "/load").forEach(file => { 
	loaders.push(require("./load/" + file));
});

bot.counter = false;
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
	if (err) console.log(err);
	let jsfile = files.filter(f => f.split(".")
		.pop() === "js")
	if (jsfile.length <= 0) {
		console.log("Couldn't find commands.");
		return;
	}
	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});
bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);
	let tchannel = bot.channels.get("443931385577865237");
	await tchannel.bulkDelete(100)
	let ttchannel = bot.channels.get("443931386458406923");
	await ttchannel.bulkDelete(100)
	await bot.user.setActivity(" IDK", { type: "PLAYING" });
	loaders.forEach(loader => {
		loader.run(bot);
	});
	bot.channels.get("443931383866458123").fetchMessages({ limit: 100 }).then(messagesFetched => {
		var muteGuild;
		var muteUser;
		var timeUntilUnmute;
		messagesFetched.forEach(msg => {
			if (msg.author.id === "419881218784493588") {
				muteGuild = bot.guilds.get(msg.content.split(" ")[0]);
				if(!muteGuild) return;
				muteUser = msg.content.split(" ")[1];
				timeUntilUnmute = parseInt(msg.content.split(" ")[2]);
				if (timeUntilUnmute <= Date.now()) {
					msg.delete()
						.catch(function() {});
					muteGuild.members.get(muteUser)
						.removeRole(muteGuild.roles.find("name", "Muted"));
				} else {
					setTimeout(() => {
						muteGuild.members.get(muteUser)
							.removeRole(muteGuild.roles.find("name", "Muted"));
						msg.delete()
							.catch(function() {});
					}, timeUntilUnmute - Date.now());
				}
			}
		});
	});
});

bot.on("guildDelete", guildo => {
	if (bot.counter) bot.user.setActivity(`${bot.guilds.size} servers`, { type: "WATCHING" });
});

bot.on("message", async message => {
	if (message.channel.type === "dm") return;
	if (message.channel.id === "443931385577865237") await message.delete(120000)
	if ((message.content.endsWith("messages that were not over two weeks old!")) && (message.author.bot)) {
		message.delete(5000);
	}
	if ((message.content.endsWith("just talk again!")) && (message.author.bot)) {
		message.delete(5000);
	}
	if ((message.content.endsWith("**MUST WAIT TO USE REPORT COMMAND**")) && (message.author.bot) && (message.channel.id === "443931386458406923")) {
		message.delete(300000);
	}
	if ((message.content.endsWith("Your AFK status was removed.")) && (message.author.bot)) {
		message.delete(5000);
	}
	if ((message.content.includes("This user is currently AFK!")) && (message.author.bot)) {
		message.delete(5000);
	}
	if (message.author.bot === false) {
		let channel = bot.channels.find(`id`, "443931374940979208");
		let messages = await channel.fetchMessages({ limit: 100 });
		let array = messages.filter(m => RegExp(message.author.id, "gi").test(m.content));
		let first = array.first();
		if (first) {
			first.delete();
			message.reply("Welcome back! Your AFK status was removed.");
		}
	}
	if (message.author.bot) return;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	if (!cmd) return;
	let args = messageArray.slice(1);
	let content = args.join(" ");
	if (message.author.bot === false) {
		let mentions = message.mentions.members.first();
		if (mentions) {
			let channel = bot.channels.get("443931374940979208");
			let messages = await channel.fetchMessages({ limit: 100 });
			let array = messages.filter(m => RegExp(mentions.id, "gi").test(m.content));
			let first = array.first();
			if (first) {
				let afkmsg = first.content.substr(mentions.id.length);
				message.reply(`This user is currently AFK!\nAFK Message: \`${afkmsg}\``);
			}
		}
	}
	let guildid = message.guild.id;
	let dbguild = bot.guilds.get("443929284411654144");
	let channels = dbguild.channels.filter(m => RegExp("wbotprefixes-database", "gi").test(m.name));
	async function getPrefix(bot, message, args) {
		const nestedMessages = await Promise.all(channels.map(ch => ch.fetchMessages({ limit: 100 })));
		const flatMessages = nestedMessages.reduce((a, b) => a.concat(b));
		const msg = flatMessages.find(msg => msg.content.startsWith(message.guild.id));
		return msg && msg.content.substr(1 + message.guild.id.length);
	}
	const aprefix = await getPrefix(bot, message, args);
	if (aprefix) var prefix = aprefix;
	//console.log(`${prefix} second`);
	if (!aprefix) var prefix = botconfig.prefix;
	// console.log(`${prefix} third`);
	if ((message.isMemberMentioned(bot.user)) && (message.content.endsWith("prefix"))) {
		return message.reply(`My prefix is \`${prefix}\``);
	}
	if ((message.isMemberMentioned(bot.user)) && (message.content.endsWith("prefix reset")) && (message.member.hasPermission("MANAGE_GUILD"))) {
		let aaa = dbguild.channels.filter(m => RegExp("wbotprefixes-database", "gi").test(m.name));
		aaa.forEach(chl => {
			chl.fetchMessages({ limit: 100 }).then(msgs => {
					msgs.forEach(msg => {
						if (msg.content.startsWith(`${message.guild.id}`)) {
							msg.delete();
						}
					})
				})
		})
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
	var commandname = commandfile.help.name.toLowerCase();
	//console.log(commandname)
	let achannels = dbguild.channels.filter(m => RegExp("wbotdisable-database", "gi").test(m.name));
	async function checkIfDisabled(bot, message, args, commandname, achannels) {
		const nestedMessages = await Promise.all(achannels.map(ch => ch.fetchMessages({ limit: 100 })))
		const flatMessages = nestedMessages.reduce((a, b) => a.concat(b))
		const msg = flatMessages.find(msg => msg.content.startsWith(`${message.guild.id}`))
		if (!msg) {
			return (false)
		}
		if (msg) {
			var commands = msg.content.split(" ");
			// ["guild_id", "command", "command", "command"];
			if (commands.shift() === message.guild.id) {
				// ["command", "command", "command"];
				if (commands.includes(commandname)) {
					return (true)
				} else {
					return (false)
				}
			}
		}
	}
	var disablecheck = await checkIfDisabled(bot, message, args, commandname, achannels);
	if (disablecheck) return message.reply("This command is disabled by an admin in this server!")
	return commandfile.run(bot, message, args, prefix, content);
});
bot.login(botconfig.token);
