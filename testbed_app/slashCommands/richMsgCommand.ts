import {
    IRead,
    IModify,
    IHttp,
    IPersistence,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { App } from "@rocket.chat/apps-engine/definition/App";
import {
    BlockElementType,
    ButtonStyle,
    TextObjectType,
} from "@rocket.chat/apps-engine/definition/uikit";

export class RichMsgCommand implements ISlashCommand {
    command: string = "rich-msg";
    i18nParamsExample: string = "";
    i18nDescription: string = "the command to show the rich message";
    providesPreview: boolean = false;

    constructor(private readonly app: App) {}

    async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const msgBuilder = modify.getCreator().startMessage();

        const sender = context.getSender();
        const room = context.getRoom();

        const blockBuilder = modify.getCreator().getBlockBuilder();
        blockBuilder.addContextBlock({
            blockId: "infoMessage",
            elements: [
                {
                    type: TextObjectType.PLAINTEXT,
                    text: "Please select your answer",
                    emoji: true,
                },
            ],
        });
        blockBuilder.addInputBlock({
            blockId: "infoInput",
            label: {
                type: TextObjectType.PLAINTEXT,
                text: "info",
                emoji: true,
            },
            element: {
                type: BlockElementType.PLAIN_TEXT_INPUT,
                actionId: "info",
                initialValue: "test",
                placeholder: blockBuilder.newPlainTextObject(
                    "Please input the infomation",
                    true
                ),
            },
        });
        blockBuilder.addActionsBlock({
            blockId: "infoAction",
            elements: [
                blockBuilder.newButtonElement({
                    actionId: "okBtn",
                    text: {
                        type: TextObjectType.PLAINTEXT,
                        text: "OK",
                        emoji: true,
                    },
                    value: "OK",
                    style: ButtonStyle.PRIMARY,
                }),
                blockBuilder.newButtonElement({
                    actionId: "noBtn",
                    text: {
                        type: TextObjectType.PLAINTEXT,
                        text: "NO",
                        emoji: true,
                    },
                    value: "NO",
                    style: ButtonStyle.DANGER,
                }),
            ],
        });

        msgBuilder.setSender(sender).setRoom(room).setBlocks(blockBuilder);

        await modify.getCreator().finish(msgBuilder);
    }
}
