import { Param } from '@nestjs/common';

import { SafeParseInt } from '../pipes/safe-parse-int.pipe';

export const IntParam = (parameterName: string) => (
  target: Record<string, unknown>,
  propertyKey: string | symbol,
  parameterIndex: number
): void => {
  Param(parameterName, SafeParseInt)(target, propertyKey, parameterIndex);
};
