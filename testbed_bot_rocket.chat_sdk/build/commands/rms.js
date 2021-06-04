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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rms = void 0;
const axios_1 = __importDefault(require("axios"));
const sdk_1 = require("@rocket.chat/sdk");
exports.rms = {
    name: "rms",
    description: "request rms service",
    command: (message, room) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { SERVICE_RMS_URL, SERVICE_RMS_ENDPOINT } = process.env;
        yield sdk_1.driver.sendToRoom("Request to rms service...", room);
        const { data } = yield axios_1.default.post(`${SERVICE_RMS_URL}/${SERVICE_RMS_ENDPOINT}`, {
            userId: (_a = sdk_1.api.currentLogin) === null || _a === void 0 ? void 0 : _a.userId,
            authToken: (_b = sdk_1.api.currentLogin) === null || _b === void 0 ? void 0 : _b.authToken,
        });
        yield sdk_1.driver.sendToRoom(data.message, room);
    }),
};
