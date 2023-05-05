import { PageRequest } from '@wire/core/models';
import { ArrayUnique, IsInt, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ArtistPageReqDto extends PageRequest {
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
}
