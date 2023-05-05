import { BadRequestException, Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { ExceptionMessage, ExceptionTypes } from '@wire/core/exception';
import { Genre, RepositoryService } from '@wire/repository';

@Injectable()
export class GenresValidationService {

  constructor(
    private repository: RepositoryService
  ) { }

  async existsById(genreId: number): Promise<Genre> {
    const genre = await this.repository.genre.findOneBy({ genreId });
    if (!genre) {
      throw new BadRequestException([
        new ExceptionMessage<Genre>('genreId', ExceptionTypes.NotExist),
      ]);
    }

    return genre;
  }

  async existsByName(name: string, genreId?: number): Promise<void> {
    const exists = await this.repository.genre.findOneBy({
      name,
      genreId: genreId ? Not(genreId) : null,
    });

    if (exists) {
      throw new BadRequestException([
        new ExceptionMessage<Genre>('name', ExceptionTypes.AlreadyExists),
      ]);
    }
  }

  async existsById3(id3: number, genreId?: number): Promise<void> {
    const exists = await this.repository.genre.findOneBy({
      id3,
      genreId: genreId ? Not(genreId) : null,
    });

    if (exists) {
      throw new BadRequestException([
        new ExceptionMessage<Genre>('id3', ExceptionTypes.AlreadyExists),
      ]);
    }
  }
}
