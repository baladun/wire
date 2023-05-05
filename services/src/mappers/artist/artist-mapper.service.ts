import { Injectable } from '@nestjs/common';
import { ArtistDto, UpsertArtistDto } from '@wire/dto';
import { Artist, Genre } from '@wire/repository';
import { GenreMapperService } from '../genre/genre-mapper.service';

@Injectable()
export class ArtistMapperService {

  constructor(
    private genreMapper: GenreMapperService,
  ) { }

  toArtist(dto: UpsertArtistDto, genres: Genre[]): Artist {
    const artist = new Artist();
    artist.name = dto.name;
    artist.genres = genres;

    return artist;
  }

  toArtistDto(artist: Artist): ArtistDto {
    const dto = new ArtistDto();
    dto.artistId = artist.artistId;
    dto.name = artist.name;
    dto.genres = (artist.genres || []).map(el => this.genreMapper.toGenreDto(el));

    return dto;
  }

  fillArtist(artist: Artist, dto: UpsertArtistDto, genres: Genre[]): Artist {
    artist.name = dto.name;
    artist.genres = genres;
    return artist;
  }
}
