import { Injectable } from '@nestjs/common';
import { Genre } from '@wire/repository';
import { GenreDto, UpsertGenreDto } from '@wire/dto';

@Injectable()
export class GenreMapperService {

  toGenreDto(genre: Genre): GenreDto {
    const dto = new GenreDto();
    dto.genreId = genre.genreId;
    dto.name = genre.name;
    dto.id3 = genre.id3;

    return dto;
  }

  fillGenre(genre: Genre, dto: UpsertGenreDto): Genre {
    return Object.assign(genre, dto);
  }
}
