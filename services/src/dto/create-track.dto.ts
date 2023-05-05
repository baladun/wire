import { ArrayUnique, IsArray, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  artistId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  year: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  durationInSec: number;

  @IsNotEmpty()
  @IsInt()
  audioId: number;

  @IsOptional()
  @IsInt()
  coverId?: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  genreIds: number[];
}
