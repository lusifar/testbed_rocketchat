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

export class PersisCommand implements ISlashCommand {
    command: string = "testbed-persis";
    i18nParamsExample: string = "";
    i18nDescription: string = "The simple command to test the persistance";
    providesPreview: boolean = false;

    constructor(private readonly app: App) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        this.app.getLogger().debug("run slash command - test-persis");

        // get the specific user and room
        const sender = await read.getUserReader().getByUsername("testbed_bot");
        if (!sender) {
            return;
        }

        const room = await read.getRoomReader().getByName("general");
        if (!room) {
            return;
        }

        const msgBuilder = modify.getCreator().startMessage();
        msgBuilder.setSender(sender).setRoom(room);

        const [queryId] = context.getArguments();
        if (!queryId) {
            const createdId = await persis.create({
                room: "RickyRoom",
                mention: "@rickychao",
                command: "/my/command",
            });

            msgBuilder.setText(`${createdId}`);
        } else {
            const obj = await read.getPersistenceReader().read(queryId);

            // send the information to the channel
            const msg = `${JSON.stringify(obj)}`;

            msgBuilder.setText(msg);
        }
        await modify.getCreator().finish(msgBuilder);
    }
}
