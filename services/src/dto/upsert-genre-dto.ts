import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpsertGenreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  id3: number;
}
