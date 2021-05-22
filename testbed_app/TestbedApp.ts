import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger,
    IRead,
    IHttp,
    IPersistence,
    IModify,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ApiSecurity,
    ApiVisibility,
} from "@rocket.chat/apps-engine/definition/api";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";

import {
    UIKitBlockInteractionContext,
    UIKitViewSubmitInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionContext";
import { IUIKitInteractionHandler } from "@rocket.chat/apps-engine/definition/uikit/IUIKitActionHandler";
import { IUIKitResponse } from "@rocket.chat/apps-engine/definition/uikit/IUIKitInteractionType";

import { TestApiEndpoint } from "./apiEndpoints/testApiEndpoint";
import { HelloCommand } from "./slashCommands/helloCommand";
import { RichMsgCommand } from "./slashCommands/richMsgCommand";
import { SubArgCommand } from "./slashCommands/subArgCommand";
import { ShowModalCommand } from "./slashCommands/showModalCommand";

import { RICH_MSG_ACTION_ID } from "./slashCommands/richMsgCommand";
import { processRichMsgAction } from "./slashCommands/richMsgCommand";

import {
    SHOW_MODAL_ACTION_ID,
    SHOW_MODAL_VIEW_ID,
} from "./utilities/createModal";
import {
    processShowModalAction,
    processShowModalSubmit,
} from "./slashCommands/showModalCommand";
import { IBlock } from "@rocket.chat/apps-engine/definition/uikit/blocks/Blocks";

export class TestbedApp extends App implements IUIKitInteractionHandler {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async extendConfiguration(configuration: IConfigurationExtend) {
        await configuration.api.provideApi({
            visibility: ApiVisibility.PUBLIC,
            security: ApiSecurity.UNSECURE,
            endpoints: [new TestApiEndpoint(this)],
        });

        await configuration.slashCommands.provideSlashCommand(
            new HelloCommand(this)
        );

        await configuration.slashCommands.provideSlashCommand(
            new RichMsgCommand(this)
        );

        await configuration.slashCommands.provideSlashCommand(
            new SubArgCommand(this)
        );

        await configuration.slashCommands.provideSlashCommand(
            new ShowModalCommand(this)
        );
    }

    public async executeBlockActionHandler(
        context: UIKitBlockInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        const sender = await read.getUserReader().getByUsername("testbed_bot");
        if (!sender) {
            return {
                success: false,
            };
        }

        const room = await read.getRoomReader().getByName("general");
        if (!room) {
            return {
                success: false,
            };
        }

        const msgBuilder = modify.getCreator().startMessage();
        msgBuilder.setSender(sender).setRoom(room);

        const { actionId, value } = context.getInteractionData();

        let msg = "";
        if (Object.values(RICH_MSG_ACTION_ID).includes(actionId)) {
            msg = processRichMsgAction(actionId, value!);
        }
        // else if (Object.values(SHOW_MODAL_ACTION_ID).includes(actionId)) {
        //     msg = processShowModalAction(actionId, value!);
        // }
        msgBuilder.setText(msg);

        await modify.getCreator().finish(msgBuilder);

        return { success: true };
    }

    public async executeViewSubmitHandler(
        context: UIKitViewSubmitInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ) {
        const { view } = context.getInteractionData();

        const sender = await read.getUserReader().getByUsername("testbed_bot");
        if (!sender) {
            return {
                success: false,
            };
        }

        const room = await read.getRoomReader().getByName("general");
        if (!room) {
            return {
                success: false,
            };
        }

        const msgBuilder = modify.getCreator().startMessage();
        msgBuilder.setSender(sender).setRoom(room);

        let blocks: IBlock[] = [];
        if (Object.values(SHOW_MODAL_VIEW_ID).includes(view.id)) {
            blocks = await processShowModalSubmit(this, view, modify);
        }
        msgBuilder.setBlocks(blocks);

        await modify.getCreator().finish(msgBuilder);

        return {
            success: true,
        };
    }
}
