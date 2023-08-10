import * as Eris from "eris";
import * as Fastify from "fastify";
import * as dotenv from "dotenv";
import * as fs from "node:fs/promises";
import { Command } from "./command.js";

dotenv.config();

const app = Fastify.fastify({
    logger: false
})

var commands = {};

const client = new Eris.Client(`Bot ${process.env.DISCORD_TOKEN}`,{
    intents: Eris.Constants.Intents.all,
    restMode: true
});

async function setupCommands() {
    const commandModuleFiles = await fs.readdir(`${process.cwd()}/dist/commands`);
    var commandObjects = [];
    for (const commandFile of commandModuleFiles) {
        if (commandFile.endsWith(".map")) {continue};
        const commandClass = await import(`./commands/${commandFile}`);
        const command: Command = new commandClass.cmd(client);
        commands[command.name] = command;
        commandObjects.push(
            {
                name: command.name,
                description: command.description,
                type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT,
                options: command.options
            }
        )
    }

    await client.bulkEditCommands(commandObjects);
    console.log("Set up application commands succesfully");
}

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.username}#${client.user.discriminator.toString()}`);
    try {
        await setupCommands();
    } catch (err) {
        console.error(err);
    }
});

client.on("error", (err) => {
    console.error(err);
});

client.on("interactionCreate", (interaction: Eris.Interaction) => {
    console.log("Stuff");
    if (interaction instanceof Eris.CommandInteraction) {
        const command = commands[interaction.data.name];
        try {
            return command.execute(interaction);
        } catch (e) {
            console.log(e);
            return interaction.createMessage({
                embeds: [
                    {
                        title: "An error has occured while running this command",
                        description: "```" + e + "```",
                        color: 15548997
                    }
                ]
            });
        }
    }
})

// Webserver

app.get("/",function(request,reply) {
    reply.send("Client is running");
});

app.listen(
    {
        port: 8080,
        host: "0.0.0.0",
        backlog: 255
    },
    function(err,address) {
        if (err) {
            app.log.error(err);
    }
});

export default app;

client.connect();