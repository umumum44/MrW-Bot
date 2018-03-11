module.exports.run = async (bot, message, args) => {
  let afkmsg = args.join(" ")
  let channel = bot.channels.find(`id`, "422201325623836682")
  channel.send(`${message.author.id}, ${message.author.tag}, ${afkmsg}`)

message.reply(`You are now AFK!: \`${afkmsg}\`\nTo become un-AFK, just talk again!`)

}
module.exports.help = {
      name: "afk"

  }
