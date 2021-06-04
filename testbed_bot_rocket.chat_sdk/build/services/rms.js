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
exports.init = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const init = () => {
    const app = express_1.default();
    app.use(body_parser_1.json());
    app.post("/api/rms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { ROCKETCHAT_URL } = process.env;
        yield axios_1.default.get(`${ROCKETCHAT_URL}/api/v1/me`, {
            headers: {
                "X-Auth-Token": req.body["authToken"],
                "X-User-Id": req.body["userId"],
            },
        });
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(req.body);
            }, 3000);
        });
        res.status(200).send({ message: "rms service is completed..." });
    }));
    app.listen(3030, () => {
        console.log("express is alive...");
    });
};
exports.init = init;
