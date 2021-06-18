import {
  ArgumentMetadata, BadRequestException, Injectable, ParseIntPipe,
} from '@nestjs/common';

import { MAX_INT_VALUE } from '../constants';

@Injectable()
export class SafeParseInt extends ParseIntPipe {
  public async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const result = await super.transform(value, metadata);

    if (result >= MAX_INT_VALUE) {
      throw new BadRequestException(
        `Value must be less than ${MAX_INT_VALUE}`,
      );
    }

    return result;
  }
}
