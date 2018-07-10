const Discord = require("discord.js");

const PREFIX = "!"

var fortunes = [ 
    "Yes",
    "No",
    "Maybe",
    "Never"
];

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("8Ball listo!");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "Hi":
            message.channel.sendMessage("Hi,there!");
            break;
        case "8ball":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);          
            else message.channel.sendMessage("Can't read that");
            break;
    }
});

bot.login(process.env.BOT_TOKEN);
