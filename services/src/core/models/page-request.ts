import { ArrayUnique, IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PageRequest {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  page?: number = 0;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(-1)
  size?: number = 10;

  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @ArrayUnique()
  @IsString({ each: true })
  @Matches(/[A-Za-z]+,(asc|desc)$/, { each: true })
  sort?: string[] = [];

  @IsOptional()
  @IsString()
  search?: string = '';
}
