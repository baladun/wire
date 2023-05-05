import { PageRequest } from '@wire/core/models';
import { ArrayUnique, IsInt, IsOptional, IsPositive } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class TrackPageReqDto extends PageRequest {
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @ArrayUnique()
  @Type(() => Number)
  @IsInt({ each: true })
  trackIds?: number[] = [];

  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @ArrayUnique()
  @Type(() => Number)
  @IsInt({ each: true })
  artistIds?: number[] = [];

  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @ArrayUnique()
  @Type(() => Number)
  @IsInt({ each: true })
  genreIds?: number[] = [];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  yearFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  yearTo?: number;
}
