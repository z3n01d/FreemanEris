import * as Eris from "eris";
import { Command } from "../command.js";

export class Song extends Command {
    name: string = "song";
    description: string = "Commands for song stuff";
    options: Array<Object> = [
        {
            type: Eris.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            name: "play",
            description: "Plays a song",
            options: [
                {
                    type: Eris.Constants.ApplicationCommandOptionTypes.STRING,
                    name: "game",
                    description: "Game from which you want the song to be",
                    required: true,
                    choices: [
                        {
                            name: "Half-Life",
                            value: "hl1"
                        },
                        {
                            name: "Half-Life 2",
                            value: "hl2"
                        },
                        {
                            name: "HL2 Episode 1",
                            value: "episodic"
                        },
                        {
                            name: "HL2 Episode 2",
                            value: "ep2"
                        },
                        {
                            name: "Portal",
                            value: "portal"
                        },
                        {
                            name: "Portal 2",
                            value: "portal2"
                        },
                    ]
                },
                {
                    type: Eris.Constants.ApplicationCommandOptionTypes.STRING,
                    name: "name",
                    description: "Name of a song you want to play",
                    required: true
                }
            ]
        },
        {
            type: Eris.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            name: "stop",
            description: "Stops a song from playing"
        },
        {
            type: Eris.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            name: "pause",
            description: "Pauses a song"
        },
        {
            type: Eris.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            name: "exit",
            description: "Makes Freeman exit any voice channel in your guild"
        }
    ];

    public execute(interaction: Eris.CommandInteraction) {
        return interaction.createMessage(`Game: ${interaction.data.options[0].name}\nSong: ${interaction.data.options[1].name}`);
    }
}

export const cmd = Song;