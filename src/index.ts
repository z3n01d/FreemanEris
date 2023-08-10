import * as Eris from "eris";
import * as Fastify from "fastify";
import * as dotenv from "dotenv";
import * as fs from "node:fs/promises";
import { Command } from "./command.js";

dotenv.config();

const app = Fastify.fastify({
    logger: true
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
    console.log(`Logged in as ${client.user.username}`);
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
        }
    }
})

// Webserver

app.get("/",function(request,reply) {
    reply.send("Client is running");
});

const PORT = Number(process.env.PORT) || 3000;

app.listen({port: PORT},function(err,address) {
    if (err) {
        app.log.error(err);
    }
});

export default app;

client.connect();