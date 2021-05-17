import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import {
    IRead,
    IModify,
    IHttp,
    IPersistence,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";

export class LiftoffCommand implements ISlashCommand {
    command: string = "liftoff";
    i18nParamsExample: string = "";
    i18nDescription: string = "Tells the user if it is the time to liftoff";
    providesPreview: boolean = false;

    constructor(private readonly app: App) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        this.app.getLogger().debug("slashcommand executor");

        const msg = `Time to lift off!`;

        const msgBuilder = modify.getCreator().startMessage();

        const sender = context.getSender();
        const room = context.getRoom();

        // get the specific user and room
        //const sender = read.getUserReader().getByUsername('rickychao');
        //const room = read.getRoomReader().getById('general');

        msgBuilder.setSender(sender).setRoom(room).setText(msg);

        await modify.getCreator().finish(msgBuilder);
    }
}
