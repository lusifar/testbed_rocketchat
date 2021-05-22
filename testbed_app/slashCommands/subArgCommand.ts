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

export class SubArgCommand implements ISlashCommand {
    command: string = "sub-arg";
    i18nParamsExample: string = "sub-arg text IOU";
    i18nDescription: string = "The command to present the arguments in command";
    providesPreview: boolean = false;

    constructor(private readonly app: App) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const args = [...context.getArguments()];
        if (args.length < 2) {
            throw new Error("the arguments are not enough");
        }

        // get the specific user and room
        const sender = await read.getUserReader().getByUsername("testbed_bot");
        if (!sender) {
            return;
        }

        const room = await read.getRoomReader().getByName("general");
        if (!room) {
            return;
        }

        // trigger the action by sub-command
        const subCommand = args[0];

        const content = args
            .slice(1)
            .reduce(
                (accumulator, currentValue) => `${accumulator} ${currentValue}`
            );

        let msg = "";
        switch (subCommand) {
            case "text":
                msg = `You type the text: ${content}`;
                break;
            case "phone":
                msg = `You call the number: ${content}`;
                break;
            default:
                msg = "The subcommand is not existed";
        }

        const msgBuilder = modify.getCreator().startMessage();
        msgBuilder.setSender(sender).setRoom(room).setText(msg);

        await modify.getCreator().finish(msgBuilder);
    }
}
