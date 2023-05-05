import { GenreDto } from './genre-dto';

export class ArtistDto {
  artistId: number;
  name: string;
  genres: GenreDto[];
}
