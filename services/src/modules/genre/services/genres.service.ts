import { BadRequestException, Injectable } from '@nestjs/common';
import { GenresValidationService } from './genres-validation.service';
import { Genre, RepositoryService } from '@wire/repository';
import { GenreDto, GenrePageReqDto, GenrePageResDto, UpsertGenreDto } from '@wire/dto';
import { GenreMapperService } from '@wire/mappers';
import { Brackets } from 'typeorm';
import { PageableService } from '@wire/core/services';

@Injectable()
export class GenresService {

  constructor(
    private repository: RepositoryService,
    private validationService: GenresValidationService,
    private genreMapper: GenreMapperService,
    private pageable: PageableService,
  ) { }

  async findAll({ page, size, sort, search, genreIds }: GenrePageReqDto): Promise<GenrePageResDto> {
    try {
      const genreAlias = 'genre';

      const totalSelect = this.repository.genre
        .createQueryBuilder(genreAlias)
        .where(
          new Brackets(db => {
            db.where({ name: this.pageable.toSearchPattern(search) });
            if (genreIds?.length) {
              db.andWhere(`${genreAlias}.genreId IN (:...genreIds)`, { genreIds });
            }
          })
        )
        .orderBy(this.pageable.toOrderBy(sort, genreAlias))
      ;
      const { entities, metadata } = await this.pageable.getPage<Genre>({ totalSelect, page, size, sort });

      return {
        content: entities.map(el => this.genreMapper.toGenreDto(el)),
        ...metadata,
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createGenre(dto: UpsertGenreDto): Promise<GenreDto> {
    await this.validationService.existsByName(dto.name);
    await this.validationService.existsById3(dto.id3);

    try {
      const genre = await this.repository.genre.save(dto);
      return this.genreMapper.toGenreDto(genre);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async updateGenre(genreId: number, dto: UpsertGenreDto): Promise<GenreDto> {
    const current = await this.validationService.existsById(genreId);
    await this.validationService.existsByName(dto.name, genreId);
    await this.validationService.existsById3(dto.id3, genreId);

    try {
      const toUpdate = this.genreMapper.fillGenre(current, dto);
      const updated = await this.repository.genre.save(toUpdate);
      return this.genreMapper.toGenreDto(updated);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteGenre(genreId: number): Promise<GenreDto> {
    const genre = await this.validationService.existsById(genreId);

    try {
      await this.repository.genre.delete(genreId);
      return this.genreMapper.toGenreDto(genre);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
