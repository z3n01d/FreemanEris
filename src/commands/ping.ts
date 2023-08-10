import * as Eris from "eris";
import { Command } from "../command.js";

export class Ping extends Command {
    name: string = "ping";
    description: string = "Gets bot's latency";
    options: Array<Object> = [];

    public execute(interaction: Eris.CommandInteraction) {
        return interaction.createMessage("Pong!");
    }
}

export const cmd = Ping;