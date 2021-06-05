import {
    IRead,
    IModify,
    IHttp,
    IPersistence,
    IMessageExtender,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IMessageAttachment } from "@rocket.chat/apps-engine/definition/messages";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";

import { App } from "@rocket.chat/apps-engine/definition/App";

export class ExtendMessageCommand implements ISlashCommand {
    command: string = "testbed-extend-message";
    i18nParamsExample: string = "";
    i18nDescription: string =
        "extend the message with image and customer field";
    providesPreview: boolean = false;

    constructor(private readonly app: App) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const args = context.getArguments();
        const message = args.reduce(
            (accumulator, currentValue) => `${accumulator} ${currentValue}`
        );

        const messageId = await this.sendMessage(context, modify, message);
        const messageExtender = await this.getMessageExtender(
            context,
            modify,
            messageId
        );

        const value = 1;
        const img = {
            imageUrl: "https://open.rocket.chat/images/logo/logo.svg",
        } as IMessageAttachment;

        messageExtender.addCustomField("key", value);
        messageExtender.addAttachment(img);

        await modify.getExtender().finish(messageExtender);
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

    private async getMessageExtender(
        context: SlashCommandContext,
        modify: IModify,
        messageId: string
    ): Promise<IMessageExtender> {
        const sender = context.getSender();
        return modify.getExtender().extendMessage(messageId, sender);
    }
}
