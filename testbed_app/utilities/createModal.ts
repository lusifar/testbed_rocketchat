import { IModify } from "@rocket.chat/apps-engine/definition/accessors";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";

export const SHOW_MODAL_ACTION_ID: {
    OVERFLOW_MENU: string;
    INPUT_QUESTION: string;
    MULTI_SELECT: string;
    SINGLE_SELECT: string;
    BUTTON_DISMISS: string;
    BUTTON_CREATE: string;
} = {
    OVERFLOW_MENU: "OVERFLOW_MENU",
    INPUT_QUESTION: "INPUT_QUESTION",
    MULTI_SELECT: "MULTI_SELECT",
    SINGLE_SELECT: "SINGLE_SELECT",
    BUTTON_DISMISS: "BUTTON_DISMISS",
    BUTTON_CREATE: "BUTTON_CREATE",
};

export const SHOW_MODAL_BLOCK_ID: {
    OVERFLOW_MENU: string;
    INPUT_QUESTION: string;
    MULTI_SELECT: string;
    SINGLE_SELECT: string;
    BUTTON_DISMISS: string;
    BUTTON_CREATE: string;
} = {
    OVERFLOW_MENU: "OVERFLOW_MENU",
    INPUT_QUESTION: "INPUT_QUESTION",
    MULTI_SELECT: "MULTI_SELECT",
    SINGLE_SELECT: "SINGLE_SELECT",
    BUTTON_DISMISS: "BUTTON_DISMISS",
    BUTTON_CREATE: "BUTTON_CREATE",
};

export const SHOW_MODAL_VIEW_ID: {
    PARAMETER_ADJUSTER: string;
} = {
    PARAMETER_ADJUSTER: "PARAMETER_AGJUSTER",
};

export async function createModal(
    modify: IModify,
    question?: string
): Promise<IUIKitModalViewParam> {
    const options = 0;

    const block = modify.getCreator().getBlockBuilder();
    block.addSectionBlock({
        blockId: SHOW_MODAL_BLOCK_ID.OVERFLOW_MENU,
        text: block.newPlainTextObject("APP BAR"),
        accessory: block.newOverflowMenuElement({
            actionId: SHOW_MODAL_ACTION_ID.OVERFLOW_MENU,
            options: [
                {
                    value: "rms",
                    text: block.newPlainTextObject("💻 RMS", true),
                },
                {
                    value: "litho",
                    text: block.newPlainTextObject("🔮 LITHO", true),
                },
                {
                    value: "emg",
                    text: block.newPlainTextObject("🔋 EMG", true),
                },
            ],
        }),
    });
    block.addImageBlock({
        imageUrl:
            "https://images.unsplash.com/photo-1587845323226-bad89242c735?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1965&q=80",
        altText: "title image",
    });

    block
        .addInputBlock({
            blockId: SHOW_MODAL_BLOCK_ID.INPUT_QUESTION,
            element: block.newPlainTextInputElement({
                initialValue: question,
                actionId: SHOW_MODAL_ACTION_ID.INPUT_QUESTION,
                placeholder: block.newPlainTextObject(
                    "Please insert your question"
                ),
            }),
            label: block.newPlainTextObject("Insert your question"),
        })
        .addDividerBlock();

    block.addActionsBlock({
        blockId: SHOW_MODAL_BLOCK_ID.MULTI_SELECT,
        elements: [
            block.newMultiStaticElement({
                placeholder: block.newPlainTextObject("Multiple choices"),
                actionId: SHOW_MODAL_ACTION_ID.MULTI_SELECT,
                initialValue: ["multiple"],
                options: [
                    {
                        text: block.newPlainTextObject("Multiple choices"),
                        value: "multiple",
                    },
                    {
                        text: block.newPlainTextObject("Single choice"),
                        value: "single",
                    },
                ],
            }),
        ],
    });

    block.addActionsBlock({
        blockId: SHOW_MODAL_BLOCK_ID.SINGLE_SELECT,
        elements: [
            block.newStaticSelectElement({
                placeholder: block.newPlainTextObject("Select Trigger"),
                actionId: SHOW_MODAL_ACTION_ID.SINGLE_SELECT,
                initialValue: "tool_transfer",
                options: [
                    {
                        text: block.newPlainTextObject("Tool Transfer"),
                        value: "tool_transfer",
                    },
                    {
                        text: block.newPlainTextObject("PM Tuning"),
                        value: "pm_tuning",
                    },
                    {
                        text: block.newPlainTextObject("PM Pirun"),
                        value: "pm_pirun",
                    },
                    {
                        text: block.newPlainTextObject("PM Initial"),
                        value: "pm_initial",
                    },
                ],
            }),
        ],
    });

    return {
        id: SHOW_MODAL_VIEW_ID.PARAMETER_ADJUSTER,
        title: block.newPlainTextObject("Parameter Adjuster"),
        submit: block.newButtonElement({
            actionId: SHOW_MODAL_ACTION_ID.BUTTON_CREATE,
            text: block.newPlainTextObject("Create"),
        }),
        close: block.newButtonElement({
            actionId: SHOW_MODAL_ACTION_ID.BUTTON_DISMISS,
            text: block.newPlainTextObject("Dismiss"),
        }),
        blocks: block.getBlocks(),
    };
}
