import * as Eris from "eris";

export class Command {
    client: Eris.Client;
    name: string = "";
    description: string = "";
    options: Array<Object> = [];

    constructor(client: Eris.Client) {
        this.client = client;
    }

    public execute(interaction: Eris.CommandInteraction): void {
        
    }
}