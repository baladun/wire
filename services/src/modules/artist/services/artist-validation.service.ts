import { BadRequestException, Injectable } from '@nestjs/common';
import { In, Not } from 'typeorm';
import { ExceptionMessage, ExceptionTypes } from '@wire/core/exception';
import { Artist, Genre, RepositoryService } from '@wire/repository';
import { ArtistDto, UpsertArtistDto } from '@wire/dto';

@Injectable()
export class ArtistValidationService {

  constructor(
    private repository: RepositoryService,
  ) { }

  async existsByName(name: string, artistId?: number): Promise<void> {
    const exists = await this.repository.artist.findOneBy({
      name,
      artistId: artistId ? Not(artistId) : null,
    });

    if (exists) {
      throw new BadRequestException([
        new ExceptionMessage<ArtistDto>('name', ExceptionTypes.AlreadyExists),
      ]);
    }
  }

  async genresExist(genreIds: number[]): Promise<Genre[]> {
    if (!genreIds?.length) {
      return null;
    }

    const exist = await this.repository.genre.find({ where: { genreId: In(genreIds) } });
    if (exist?.length !== genreIds.length) {
      throw new BadRequestException([
        new ExceptionMessage<UpsertArtistDto>('genreIds', ExceptionTypes.SomeNotExist),
      ]);
    }

    return exist;
  }

  async existsById(artistId: number): Promise<Artist> {
    const exists = await this.repository.artist.findOneBy({ artistId });
    if (!exists) {
      throw new BadRequestException([
        new ExceptionMessage<Artist>('artistId', ExceptionTypes.NotExist),
      ]);
    }

    return exists;
  }
}
