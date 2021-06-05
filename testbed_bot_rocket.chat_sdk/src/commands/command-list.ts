import { TCommand } from '../types/command';

import { ping } from './ping';
import { rms } from './rms';

export const commandList: TCommand[] = [ping, rms];
