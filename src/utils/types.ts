import { IsInt, Max, Min } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';

export type Nullable<T> = T | null;
export type ValueOf<T> = T[keyof T];
export type RawFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};
export type RawFileOrBuffer = RawFile | Buffer;

export type Cursor = {
  page: number;
  limit: number;
};

export class CursorQuery {
  @Min(1)
  @Type(() => Number)
  @IsInt()
  @Optional()
  public page = 1;

  @Max(50)
  @Min(1)
  @Type(() => Number)
  @IsInt()
  @Optional()
  public limit = 10;
}
