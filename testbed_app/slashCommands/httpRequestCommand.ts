import {
    IRead,
    IModify,
    IHttp,
    IPersistence,
    IHttpRequest,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";

import { App } from "@rocket.chat/apps-engine/definition/App";

export class HTTPRequestCommand implements ISlashCommand {
    command: string = "testbed-http-request";
    i18nParamsExample: string = "";
    i18nDescription: string = "make the http request by the command";
    providesPreview: boolean = false;

    constructor(private readonly app: App) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const [url, json] = context.getArguments();

        if (!url) {
            throw new Error("the url is not existed");
        }

        const res = await http.post(url, {
            data: JSON.parse(json),
        } as IHttpRequest);
        // const res = await http.get(url);

        const message = JSON.stringify(res.data);
        await this.sendMessage(context, modify, message);
    }

    private async sendMessage(
        context: SlashCommandContext,
        modify: IModify,
        message: string
    ): Promise<string> {
        const messageBuilder = modify.getCreator().startMessage();
        const sender = context.getSender();
        const room = context.getRoom();

        messageBuilder.setSender(sender).setRoom(room).setText(message);

        return await modify.getCreator().finish(messageBuilder);
    }
}
