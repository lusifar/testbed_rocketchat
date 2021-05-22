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
    IButtonElement,
    IMultiStaticSelectElement,
    IOverflowMenuElement,
    IStaticSelectElement,
    TextObjectType,
} from "@rocket.chat/apps-engine/definition/uikit";

export const RICH_MSG_ACTION_ID: {
    OVERFLOW_MENU: string;
    MULTI_SELECT: string;
    SINGLE_SELECT: string;
    BUTTON_OK: string;
    BUTTON_NO: string;
} = {
    OVERFLOW_MENU: "RICH_MSG_OVERFLOW_MENU",
    MULTI_SELECT: "RICH_MSG_MULTI_SELECT",
    SINGLE_SELECT: "RICH_MSG_SINGLE_SELECT",
    BUTTON_OK: "RICH_MSG_BUTTON_OK",
    BUTTON_NO: "RICH_MSG_BUTTON_NO",
};

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
        blockBuilder.addSectionBlock({
            text: {
                type: TextObjectType.PLAINTEXT,
                text: "Select your lovely animal",
                emoji: true,
            },
            accessory: {
                type: BlockElementType.OVERFLOW_MENU,
                actionId: RICH_MSG_ACTION_ID.OVERFLOW_MENU,
                options: [
                    {
                        value: "horse",
                        text: {
                            type: TextObjectType.PLAINTEXT,
                            text: "Horse 🐴",
                            emoji: true,
                        },
                    },
                    {
                        value: "rat",
                        text: {
                            type: TextObjectType.PLAINTEXT,
                            text: "Rat 🐭",
                            emoji: true,
                        },
                    },
                    {
                        value: "cat",
                        text: {
                            type: TextObjectType.PLAINTEXT,
                            text: "Cat 🐱",
                            emoji: true,
                        },
                    },
                ],
            } as IOverflowMenuElement,
        });
        blockBuilder.addImageBlock({
            imageUrl: "https://picsum.photos/200/300",
            altText: "the testbed image",
            title: {
                type: TextObjectType.PLAINTEXT,
                text: "Good Image",
                emoji: true,
            },
        });
        blockBuilder.addActionsBlock({
            elements: [
                {
                    type: BlockElementType.MULTI_STATIC_SELECT,
                    actionId: RICH_MSG_ACTION_ID.MULTI_SELECT,
                    initialValue: ["basketball", "soccor"],
                    options: [
                        {
                            value: "basketball",
                            text: {
                                type: TextObjectType.PLAINTEXT,
                                text: "BasketBall 🏀",
                                emoji: true,
                            },
                        },
                        {
                            value: "golf",
                            text: {
                                type: TextObjectType.PLAINTEXT,
                                text: "Golf 🏌️‍♂️",
                                emoji: true,
                            },
                        },
                        {
                            value: "soccor",
                            text: {
                                type: TextObjectType.PLAINTEXT,
                                text: "Soccor ⚽",
                                emoji: true,
                            },
                        },
                        {
                            value: "baseball",
                            text: {
                                type: TextObjectType.PLAINTEXT,
                                text: "BaseBall ⚾",
                                emoji: true,
                            },
                        },
                    ],
                    placeholder: {
                        type: TextObjectType.PLAINTEXT,
                        text: "Select your fa vorite sport",
                        emoji: true,
                    },
                } as IMultiStaticSelectElement,
            ],
        });
        blockBuilder.addActionsBlock({
            elements: [
                {
                    type: BlockElementType.STATIC_SELECT,
                    actionId: RICH_MSG_ACTION_ID.SINGLE_SELECT,
                    initialValue: "engineer",
                    options: [
                        {
                            value: "engineer",
                            text: {
                                type: TextObjectType.PLAINTEXT,
                                text: "Engineer 🚀",
                                emoji: true,
                            },
                        },
                        {
                            value: "pm",
                            text: {
                                type: TextObjectType.PLAINTEXT,
                                text: "PM 👼",
                                emoji: true,
                            },
                        },
                        {
                            value: "manager",
                            text: {
                                type: TextObjectType.PLAINTEXT,
                                text: "Manager 🐯",
                                emoji: true,
                            },
                        },
                    ],
                    placeholder: {
                        type: TextObjectType.PLAINTEXT,
                        text: "Select your job catagory",
                        emoji: true,
                    },
                } as IStaticSelectElement,
            ],
        });
        blockBuilder.addDividerBlock();
        blockBuilder.addActionsBlock({
            elements: [
                {
                    type: BlockElementType.BUTTON,
                    actionId: RICH_MSG_ACTION_ID.BUTTON_OK,
                    text: {
                        type: TextObjectType.PLAINTEXT,
                        text: "OK",
                        emoji: true,
                    },
                    value: "OK",
                    style: ButtonStyle.PRIMARY,
                } as IButtonElement,
                {
                    type: BlockElementType.BUTTON,
                    actionId: RICH_MSG_ACTION_ID.BUTTON_NO,
                    text: {
                        type: TextObjectType.PLAINTEXT,
                        text: "NO",
                        emoji: true,
                    },
                    value: "NO",
                    style: ButtonStyle.DANGER,
                } as IButtonElement,
            ],
        });

        msgBuilder.setSender(sender).setRoom(room).setBlocks(blockBuilder);

        await modify.getCreator().finish(msgBuilder);
    }
}

export function processRichMsgAction(actionId: string, value: string): string {
    let msg = "No meet action id";
    switch (actionId) {
        case RICH_MSG_ACTION_ID.OVERFLOW_MENU:
            msg = `Your lovely animal is "${value}"`;
            break;
        case RICH_MSG_ACTION_ID.MULTI_SELECT:
            msg = `Your favorite sports are "${value}"`;
            break;
        case RICH_MSG_ACTION_ID.SINGLE_SELECT:
            msg = `Your job category is "${value}"`;
            break;
        case RICH_MSG_ACTION_ID.BUTTON_NO:
            msg = "You click no answer";
            break;
        case RICH_MSG_ACTION_ID.BUTTON_OK:
            msg = "You click ok answer";
            break;
    }
    return msg;
}
