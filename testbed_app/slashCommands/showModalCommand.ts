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

import { createModal } from "../utilities/createModal";

import {
    SHOW_MODAL_ACTION_ID,
    SHOW_MODAL_BLOCK_ID,
} from "../utilities/createModal";
import {
    ButtonStyle,
    IBlock,
    IUIKitView,
} from "@rocket.chat/apps-engine/definition/uikit";

export class ShowModalCommand implements ISlashCommand {
    command: string = "testbed-show-modal";
    i18nParamsExample: string = "";
    i18nDescription: string = "The command to show modal dialog";
    providesPreview: boolean = false;

    constructor(private readonly app: App) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const triggerId = context.getTriggerId();

        const question = context.getArguments().join(" ");

        if (triggerId) {
            const modal = await createModal(modify, question);
            await modify
                .getUiController()
                .openModalView(modal, { triggerId }, context.getSender());
        }
    }
}

export function processShowModalAction(
    actionId: string,
    value: string
): string {
    let msg = "No meet action id";
    switch (actionId) {
        case SHOW_MODAL_ACTION_ID.OVERFLOW_MENU:
            msg = `Your menu is "${value}"`;
            break;
        case SHOW_MODAL_ACTION_ID.MULTI_SELECT:
            msg = `Your multi selections are "${value}"`;
            break;
        case SHOW_MODAL_ACTION_ID.SINGLE_SELECT:
            msg = `Your single selection is "${value}"`;
            break;
        case SHOW_MODAL_ACTION_ID.BUTTON_DISMISS:
            msg = "You click dismiss";
            break;
        case SHOW_MODAL_ACTION_ID.BUTTON_CREATE:
            msg = "You click create";
            break;
    }
    return msg;
}

export async function processShowModalSubmit(
    app: App,
    view: IUIKitView,
    modify: IModify
): Promise<IBlock[]> {
    const { state } = view;

    const block = modify.getCreator().getBlockBuilder();

    block.addSectionBlock({
        text: block.newPlainTextObject(
            `Your question ${JSON.stringify(
                state![SHOW_MODAL_BLOCK_ID.INPUT_QUESTION][
                    SHOW_MODAL_ACTION_ID.INPUT_QUESTION
                ]
            )}`,
            true
        ),
    });
    block.addImageBlock({
        imageUrl:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        altText: "the chart result",
    });
    block.addDividerBlock();
    block.addActionsBlock({
        elements: [
            block.newButtonElement({
                text: block.newPlainTextObject("Correct"),
                style: ButtonStyle.PRIMARY,
            }),
            block.newButtonElement({
                text: block.newPlainTextObject("Failed"),
                style: ButtonStyle.DANGER,
            }),
        ],
    });

    return block.getBlocks();
}
