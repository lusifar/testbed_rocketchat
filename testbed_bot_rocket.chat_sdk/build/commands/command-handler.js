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
exports.commandHandler = void 0;
const sdk_1 = require("@rocket.chat/sdk");
const command_list_1 = require("./command-list");
const commandHandler = (err, message) => __awaiter(void 0, void 0, void 0, function* () {
    if (err) {
        console.error(err);
        return;
    }
    console.log(JSON.stringify(message));
    if (!message.msg || !message.rid) {
        return;
    }
    const roomName = yield sdk_1.driver.getRoomName(message.rid);
    const [prefix, commandName] = message.msg.split(' ');
    if (prefix === '!iesd') {
        for (const command of command_list_1.commandList) {
            if (commandName === command.name) {
                yield command.command(message, roomName);
                return;
            }
        }
        yield sdk_1.driver.sendToRoom(`I am sorry, but '${commandName}' is not a valid name`, roomName);
    }
});
exports.commandHandler = commandHandler;
