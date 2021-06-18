import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { sanitize } from 'class-sanitizer';

@Injectable()
export class SanitizePipe implements PipeTransform {
  public transform(value: object, metadata: ArgumentMetadata): object {
    if (['body', 'query', 'param'].includes(metadata.type)) {
      sanitize(value);
    }

    return value;
  }
}
