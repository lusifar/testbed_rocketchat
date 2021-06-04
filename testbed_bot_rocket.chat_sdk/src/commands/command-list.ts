import { TCommand } from '../types/command';

import { ping } from './ping';
import { rms } from './rms';
import { showUI } from './showUI';

export const commandList: TCommand[] = [ping, rms, showUI];
