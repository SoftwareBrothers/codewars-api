import { ArgumentMetadata } from '@nestjs/common';

import { MAX_INT_VALUE } from '../constants';

import { SafeParseInt } from './safe-parse-int.pipe';

describe('SafeParseIntPipe', () => {
  let pipe: SafeParseInt;
  const mockMetadata = {} as ArgumentMetadata;

  beforeEach(() => {
    pipe = new SafeParseInt();
  });

  it('should throw 400 when given value is not a number', async () => {
    const result = pipe.transform('asdasd', mockMetadata);

    await expect(result).rejects.toEqual(expect.objectContaining({
      message: 'Validation failed (numeric string is expected)',
      status: 400,
    }));
  });

  it('should throw 400 when given value is equal max allowed int', async () => {
    const result = pipe.transform(`${MAX_INT_VALUE}`, mockMetadata);

    await expect(result).rejects.toEqual(expect.objectContaining({
      message: 'Value must be less than 2147483647',
      status: 400,
    }));
  });

  it('should throw 400 when given value is greater than max allowed int', async () => {
    const result = pipe.transform(`${MAX_INT_VALUE + 1}`, mockMetadata);

    await expect(result).rejects.toEqual(expect.objectContaining({
      message: 'Value must be less than 2147483647',
      status: 400,
    }));
  });
});
