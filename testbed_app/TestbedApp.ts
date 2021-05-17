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

import { UIKitBlockInteractionContext } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionContext";
import { IUIKitInteractionHandler } from "@rocket.chat/apps-engine/definition/uikit/IUIKitActionHandler";
import { IUIKitResponse } from "@rocket.chat/apps-engine/definition/uikit/IUIKitInteractionType";

import { TestApiEndpoint } from "./apiEndpoints/testApiEndpoint";
import { LiftoffCommand } from "./slashCommands/liftoffCommand";
import { RichMsgCommand } from "./slashCommands/richMsgCommand";

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
            new LiftoffCommand(this)
        );

        await configuration.slashCommands.provideSlashCommand(
            new RichMsgCommand(this)
        );
    }

    public async executeBlockActionHandler(
        context: UIKitBlockInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        this.getLogger().debug("[TestbedApp] executeBlockActionHandler");

        const { actionId } = context.getInteractionData();
        switch (actionId) {
            case "okBtn":
                this.getLogger().debug(`${actionId}`);
                break;
            case "noBtn":
                this.getLogger().debug(`${actionId}`);
                break;
        }

        return { success: true };
    }
}
