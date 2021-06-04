import { driver } from "@rocket.chat/sdk";
import { TCommand } from "../types/command";

export const ping: TCommand = {
  name: "ping",
  description: "Pings the bot.",
  command: async (message, room) => {
    await driver.sendToRoom("Pong!", room);
  },
};
