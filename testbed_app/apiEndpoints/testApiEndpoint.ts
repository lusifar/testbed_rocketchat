import {
    HttpStatusCode,
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ApiEndpoint,
    IApiRequest,
    IApiResponse,
    IApiEndpointInfo,
} from "@rocket.chat/apps-engine/definition/api";

export class TestApiEndpoint extends ApiEndpoint {
    public path = "test";

    public async post(
        request: IApiRequest,
        endpoint: IApiEndpointInfo,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<IApiResponse> {
        const body = Object.entries(request.content)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");

        const sender = await read.getUserReader().getByUsername("testbed_bot");
        if (!sender) {
            return {
                status: HttpStatusCode.NOT_FOUND,
                content: `User "testbed_bot" could not be found`,
            };
        }

        const room = await read.getRoomReader().getByName("general");
        if (!room) {
            return {
                status: HttpStatusCode.NOT_FOUND,
                content: `Room "#general" could not be found`,
            };
        }

        const messageBuilder = modify
            .getCreator()
            .startMessage()
            .setText(body)
            .setSender(sender)
            .setRoom(room);
        const messageId = await modify.getCreator().finish(messageBuilder);

        return this.success(JSON.stringify({ messageId }));
    }
}
