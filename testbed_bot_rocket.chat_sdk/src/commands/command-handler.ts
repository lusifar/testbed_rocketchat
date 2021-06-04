import { driver } from '@rocket.chat/sdk';
import { IMessage } from '@rocket.chat/sdk/dist/config/messageInterfaces';
import { commandList } from './command-list';

export const commandHandler = async (err: unknown, message: IMessage): Promise<void> => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(JSON.stringify(message));

  if (!message.msg || !message.rid) {
    return;
  }

  const roomName = await driver.getRoomName(message.rid);
  const [prefix, commandName] = message.msg.split(' ');
  if (prefix === '!iesd') {
    for (const command of commandList) {
      if (commandName === command.name) {
        await command.command(message, roomName);
        return;
      }
    }
    await driver.sendToRoom(`I am sorry, but '${commandName}' is not a valid name`, roomName);
  }
};
