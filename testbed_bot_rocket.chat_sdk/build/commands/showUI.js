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
exports.showUI = void 0;
const sdk_1 = require("@rocket.chat/sdk");
exports.showUI = {
    name: 'showUI',
    description: 'show the ui result',
    command: (message, room) => __awaiter(void 0, void 0, void 0, function* () {
        const response = {
            rid: room,
            msg: 'test actions',
            mentions: ['lusifar', 'rickychao', 'botkit', 'hubot'],
            attachments: [
                {
                    image_url: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80',
                    actions: [
                        // {
                        //   image_url:
                        //     'https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80',
                        // },
                        {
                            type: 'button',
                            text: 'Ping',
                            msg: '!iesd ping',
                            button_alignment: 'horizontal',
                        },
                        {
                            type: 'button',
                            text: 'RMS',
                            msg: '!iesd rms 123456',
                            button_alignment: 'horizontal',
                        },
                    ],
                },
            ],
        };
        yield sdk_1.driver.sendToRoom(response, room);
    }),
};
