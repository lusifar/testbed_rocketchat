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

export class HelloCommand implements ISlashCommand {
    command: string = "hello";
    i18nParamsExample: string = "";
    i18nDescription: string = "The simple command to print hello world";
    providesPreview: boolean = false;

    constructor(private readonly app: App) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        // get the specific user and room
        const sender = await read.getUserReader().getByUsername("testbed_bot");
        if (!sender) {
            return;
        }

        const room = await read.getRoomReader().getByName("general");
        if (!room) {
            return;
        }

        // send the
        const msg = `Hello ${
            context.getSender().name
        }, welcome to the real world`;

        const msgBuilder = modify.getCreator().startMessage();

        msgBuilder.setSender(sender).setRoom(room).setText(msg);

        await modify.getCreator().finish(msgBuilder);
    }
}
