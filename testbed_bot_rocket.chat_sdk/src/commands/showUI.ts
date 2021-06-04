import { driver } from '@rocket.chat/sdk';
import { IMessage, IMessageAction, IMessageAttachment } from '@rocket.chat/sdk/dist/config/messageInterfaces';
import { TCommand } from '../types/command';

export const showUI: TCommand = {
  name: 'showUI',
  description: 'show the ui result',
  command: async (message, room) => {
    const response: IMessage = {
      rid: room,
      msg: 'test actions',
      mentions: ['lusifar', 'rickychao', 'botkit', 'hubot'],
      attachments: [
        {
          image_url:
            'https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80',
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
          ] as IMessageAction[],
        },
      ],
    };

    await driver.sendToRoom(response, room);
  },
};
