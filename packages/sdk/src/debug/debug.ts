import { subscribe } from '@/bridge/events/listening/subscribe.js';
import { unsubscribe } from '@/bridge/events/listening/unsubscribe.js';
import { Logger } from '@/logger/Logger.js';
import type { MiniAppsSubscribeListener } from '@/bridge/events/types.js';

export const logger = new Logger('SDK', {
  bgColor: 'forestgreen',
  textColor: 'white',
});

let debugEnabled = false;

const onEvent: MiniAppsSubscribeListener = ({ name, payload }) => {
  logger.log('Event received:', payload ? { name, payload } : { name });
};

/**
 * Sets new debug mode. Enabling debug mode leads to printing additional messages in the console,
 * related to the processes inside the package.
 * @param enable - should debug be enabled.
 */
export function setDebug(enable: boolean): void {
  if (debugEnabled !== enable) {
    debugEnabled = enable;
    enable ? subscribe(onEvent) : unsubscribe(onEvent);
  }
}

/**
 * Logs info message into the console.
 * @param args - additional arguments.
 */
export function log(...args: any[]): void {
  if (debugEnabled) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    logger.log(...args);
  }
}
