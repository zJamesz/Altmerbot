const Discord = require("discord.js");
const client = new Discord.Client(
    {
        intents: ["GUILDS", "GUILD_MESSAGES"]
    }
);
const config = require("./config.json");

client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`, { type: 'PLAYING' });
});


client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;


    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if (comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A latência é ${m.createdTimestamp - message.createdTimestamp}ms`);
    }

});

client.login(config.token);