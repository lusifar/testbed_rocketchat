"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const sdk_1 = require("@rocket.chat/sdk");
const command_handler_1 = require("../commands/command-handler");
const { ROCKETCHAT_URL, ROCKETCHAT_USER, ROCKETCHAT_PASSWORD, ROCKETCHAT_USE_SSL, } = process.env;
if (!ROCKETCHAT_URL || !ROCKETCHAT_USER || !ROCKETCHAT_PASSWORD) {
    console.error("Missing required environment variables");
    process.exit(1);
}
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const ssl = !!ROCKETCHAT_USE_SSL;
    yield sdk_1.driver.connect({
        host: ROCKETCHAT_URL,
        useSsl: ssl,
    });
    yield sdk_1.driver.login({
        username: ROCKETCHAT_USER,
        password: ROCKETCHAT_PASSWORD,
    });
    yield sdk_1.api.login({
        username: ROCKETCHAT_USER,
        password: ROCKETCHAT_PASSWORD,
    });
    yield sdk_1.driver.joinRooms(["general"]);
    yield sdk_1.driver.subscribeToMessages();
    yield sdk_1.driver.sendToRoom("I am alive!", "general");
    yield sdk_1.driver.reactToMessages(command_handler_1.commandHandler);
});
exports.init = init;
