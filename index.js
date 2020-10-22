const { Client, Collection } = require("discord.js");
const client = new Client({
    disableMentions: "all"
});
const { TOKEN, PREFIX} = require("./config");
const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
client.prefix = PREFIX;

fs.readdir("./commands", (error, files)  => {
    if (error) throw new Error(`Couldn't load the commands, ${error.message}`);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let command = require(`./commands/${file}`);
        client.commands.set(command.help.name, command);
        command.help.aliases.forEach(c => client.aliases.set(c, command));
        console.log(`Loaded command ${command.help.name}!`);
    });
});

// Load events
fs.readdir("./events", (error, files) => {
    if (error) throw new Error(`Couldn't load events, ${error.message}`);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const eventName = file.split(".")[0];
        console.log(`Loaded event ${eventName}...`);
        const event = require(`./events/${file}`);
        client.on(eventName, (...args) => event(client, ...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.login(TOKEN).then(() => {
    console.log("Logging....");
});
