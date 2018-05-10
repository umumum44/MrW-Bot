const Discord = require("discord.js");

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

let rejectionembed = new Discord.RichEmbed()
  .setDescription("nah bro")

module.exports.run = async (bot, message, args, prefix, content) => {
  if (call.message.author.id != "289380085025472523" && call.message.author.id != "432650511825633317") return call.message.channel.send(rejectionembed);
  try {
    
    const code = call.args.join(" ");
    let evaled = eval(code);
    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
      call.message.channel.send(clean(evaled), {code:"xl"});
  } catch (err) {
    call.message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
}
module.exports.help = {
  name: "eval",
  category: "Developer",
  desc: "Allows the user to run JavaScript through Discord.",
  dm: true
}
