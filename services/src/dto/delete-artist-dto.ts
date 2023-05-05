import { IsBoolean, IsOptional } from 'class-validator';

export class DeleteArtistDto {
  @IsBoolean()
  @IsOptional()
  deleteTracks?: boolean;
}
