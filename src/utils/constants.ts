import Environment, { isEnvironment } from '../config/environment';

export const MAX_INT_VALUE = 2147483647;

export const shouldSentryBeEnabled = (): boolean =>
  isEnvironment(Environment.DEVELOPMENT) ||
  isEnvironment(Environment.PRODUCTION);
