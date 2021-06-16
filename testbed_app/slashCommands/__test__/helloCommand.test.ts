import { any, mock } from "jest-mock-extended";

import {
    IAppAccessors,
    ILogger,
    IMessageBuilder,
    IModifyCreator,
    IRoomRead,
    IUserRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";

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

import { TestbedApp } from "../../TestbedApp";
import { HelloCommand } from "../helloCommand";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";

describe("HelloCommand", () => {
    const mockAppInfo = mock<IAppInfo>();
    const mockLogger = mock<ILogger>();
    const mockAppAccessors = mock<IAppAccessors>();

    const app = new TestbedApp(mockAppInfo, mockLogger, mockAppAccessors);

    const helloCommand = new HelloCommand(app);

    it("test the excutor", async () => {
        const mockContext = mock<SlashCommandContext>();
        const mockRead = mock<IRead>();
        const mockModify = mock<IModify>();
        const mockHttp = mock<IHttp>();
        const mockPersis = mock<IPersistence>();

        const mockUserRead = mock<IUserRead>();
        const mockUser = mock<IUser>();

        const mockRoomRead = mock<IRoomRead>();
        const mockRoom = mock<IRoom>();

        const mockModifyCreator = mock<IModifyCreator>();
        const mockMessageBuilder = mock<IMessageBuilder>();

        mockContext.getSender.calledWith().mockReturnValue(mockUser);
        mockUser.name = "rickyhao";

        mockRead.getUserReader.calledWith().mockReturnValue(mockUserRead);
        mockUserRead.getByUsername
            .calledWith(any())
            .mockResolvedValue(mockUser);

        mockRead.getRoomReader.calledWith().mockReturnValue(mockRoomRead);
        mockRoomRead.getByName.calledWith(any()).mockResolvedValue(mockRoom);

        mockModify.getCreator.calledWith().mockReturnValue(mockModifyCreator);
        mockModifyCreator.startMessage
            .calledWith()
            .mockReturnValue(mockMessageBuilder);

        mockMessageBuilder.setSender
            .calledWith(any())
            .mockReturnValue(mockMessageBuilder);
        mockMessageBuilder.setRoom
            .calledWith(any())
            .mockReturnValue(mockMessageBuilder);
        mockMessageBuilder.setText
            .calledWith(any())
            .mockReturnValue(mockMessageBuilder);

        mockModifyCreator.finish
            .calledWith(mockMessageBuilder)
            .mockResolvedValue("test");

        await helloCommand.executor(
            mockContext,
            mockRead,
            mockModify,
            mockHttp,
            mockPersis
        );
    });
});
