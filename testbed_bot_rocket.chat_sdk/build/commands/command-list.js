"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandList = void 0;
const ping_1 = require("./ping");
const rms_1 = require("./rms");
const showUI_1 = require("./showUI");
exports.commandList = [ping_1.ping, rms_1.rms, showUI_1.showUI];
