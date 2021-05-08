import dotenv from "dotenv";
dotenv.config();

import { init as botInit } from "./bot";
import { init as rmsInit } from "./services/rms";

botInit();
rmsInit();
