import axios from "axios";
import { api, driver } from "@rocket.chat/sdk";

import { TCommand } from "../types/command";

export const rms: TCommand = {
  name: "rms",
  description: "request rms service",
  command: async (message, room) => {
    const { SERVICE_RMS_URL, SERVICE_RMS_ENDPOINT } = process.env;

    await driver.sendToRoom("Request to rms service...", room);

    const { data } = await axios.post(
      `${SERVICE_RMS_URL}/${SERVICE_RMS_ENDPOINT}`,
      {
        userId: api.currentLogin?.userId,
        authToken: api.currentLogin?.authToken,
      }
    );

    await driver.sendToRoom(data.message, room);
  },
};
