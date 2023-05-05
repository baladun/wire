import { ArtistDto } from './artist-dto';
import { MediaDto } from './media-dto';
import { GenreDto } from './genre-dto';

export class TrackDto {
  trackId: number;
  title: string;
  artist: ArtistDto;
  year: number;
  durationInSec: number;
  audio: MediaDto;
  genres: GenreDto[];
  cover?: MediaDto;
  createdAt: Date;
}
