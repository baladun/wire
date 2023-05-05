import { ArrayUnique, IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  artistId: number;

  @IsOptional()
  @IsInt()
  coverId?: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  genreIds: number[];
}
