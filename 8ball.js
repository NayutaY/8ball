const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "NDY1NzYzNDI2NTY0ODMzMjgw.DiSPiA.4c_IfFYH5TE8KHzOqqw7dQczxsI"
const PREFIX = "!"

function generateHex() {
    return "#"+ Math.floor(Math.random() * 16777215).toString(16);
}

function play(connection, message) {
    var server = servers[message.guild.id]

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, menssage);
        else connection.disconnect();
    });
}

var fortunes = [ 
    "Yes",
    "No",
    "Maybe",
    "Never"
];

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function() {
    console.log("8Ball listo!");
});

bot.on("guildMemberAdd", function(member) {
    member.build.channel.find("name", "general"). sendMessage(member.toString() + "Bienvenido a la nada");

    member.addRole(member.guild.roles.find("name", "perra"));

    member.guild.createRole({
        name: member.user.username,
        color: generateHex(),
        permissions: []
    }).then(function(role) {
        member.addRole(role);
    });
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "amor":
            message.channel.sendMessage("Ella no me ama :c");
            break;
        case "vida":
            message.channel.sendMessage("Es un sueño sin sentido alguno.");
            break;
        case "sentimientos":
            message.channel.sendMessage("Para Que se necesita eso?");
            break;
        case "amigos":
            message.channel.sendMessage("No importa la cantidad sino la calidad.");
            break;
        case "yo":
            message.channel.sendMessage("Soledad, triteza, vacío, miedo, debilidad, desesperanza.");
            break;
        case "miedo":
            var embed = new Discord.RichEmbed()
                .addField("Miedo", "Para ella el amor era un juego. Y por ella él se jugaba la vida.", true)
                .setColor(000000)
                .setFooter("Solo era un juego sin más ~Nayu")
            message.channel.sendEmbed(embed);
            break;
        case "removerole":
            message.member.removeRole(menssage.member.guild.role.find("name", "bitch"));
            break;
        case "deleterole":
            message.member.guild.roles.find("name", "bitch").delete();
            break;
        case "play":
            if (!args[1]) {
                message.channel.sendMessage("Link donde estas?");
                return;
            }
            
            if (!message.member.voiceChannel) {
                message.channel.sendMessage("Estas en el chat de voz?");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;
        case "skip":
            var server = server[message.guildid];

            if (server.dispatcher) server.dispatcher.end();
            break;
        case "stop":
            var server = server[menssage.guild.id];

            if (menssage.guild.voiceConnection) menssage.guild.voiceConnection.disconnect();
            break;
        case "8ball":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);          
            else message.channel.sendMessage("Can't read that");
            break;
    }
});

bot.login(TOKEN);
