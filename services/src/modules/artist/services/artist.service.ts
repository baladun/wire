import { BadRequestException, Injectable } from '@nestjs/common';
import { ArtistValidationService } from './artist-validation.service';
import { Artist, RepositoryService } from '@wire/repository';
import { ArtistDto, ArtistPageReqDto, ArtistPageResDto, DeleteArtistDto, UpsertArtistDto } from '@wire/dto';
import { ArtistMapperService } from '@wire/mappers';
import { BucketService, PageableService } from '@wire/core/services';
import { Brackets } from 'typeorm';

@Injectable()
export class ArtistService {

  constructor(
    private validationService: ArtistValidationService,
    private mapperService: ArtistMapperService,
    private repository: RepositoryService,
    private bucketService: BucketService,
    private pageable: PageableService,
  ) { }

  async findAll({ page, size, sort, search, artistIds, genreIds }: ArtistPageReqDto): Promise<ArtistPageResDto> {
    try {
      const artistAlias = 'artist';
      const genreAlias = 'genre';

      const totalSelect = this.repository.artist
        .createQueryBuilder(artistAlias)
        .leftJoinAndSelect(`${artistAlias}.genres`, genreAlias)
        .where(
          new Brackets(db => {
            db.where({ name: this.pageable.toSearchPattern(search) });
            if (artistIds?.length) {
              db.andWhere(`${artistAlias}.artistId IN (:...artistIds)`, { artistIds });
            }
            if (genreIds?.length) {
              db.andWhere(`${genreAlias}.genreId IN (:...genreIds)`, { genreIds });
            }
          })
        )
        .orderBy(this.pageable.toOrderBy(sort, artistAlias))
      ;
      const { entities, metadata } = await this.pageable.getPage<Artist>({ totalSelect, page, size, sort });

      return {
        content: entities.map(el => this.mapperService.toArtistDto(el)),
        ...metadata,
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createArtist(dto: UpsertArtistDto): Promise<ArtistDto> {
    await this.validationService.existsByName(dto.name);
    const genres = await this.validationService.genresExist(dto.genreIds);

    try {
      const artist = await this.repository.artist.save(this.mapperService.toArtist(dto, genres));
      return this.mapperService.toArtistDto(artist);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async updateArtist(artistId: number, dto: UpsertArtistDto): Promise<ArtistDto> {
    const current = await this.validationService.existsById(artistId);
    await this.validationService.existsByName(dto.name, artistId);
    const genres = await this.validationService.genresExist(dto.genreIds);

    try {
      const toUpdate = this.mapperService.fillArtist(current, dto, genres);
      const updated = await this.repository.artist.save(toUpdate);
      return this.mapperService.toArtistDto(updated);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteArtist(artistId: number, dto: DeleteArtistDto): Promise<ArtistDto> {
    const artist = await this.validationService.existsById(artistId);

    try {
      if (dto?.deleteTracks) {
        const tracks = await this.repository.track.find({
          relations: {
            artist: true,
          },
          where: {
            artist: {
              artistId,
            },
          },
        });

        if (tracks?.length) {
          await this.repository.track.remove(tracks);
          const mediaIds = tracks.map(tr => tr.audio.mediaId);
          await this.repository.media.delete(mediaIds);
          await Promise.all(
            mediaIds.map(id => this.bucketService.audiosBucket.file(String(id)).delete())
          );
        }
      }
      await this.repository.artist.delete(artistId);

      return this.mapperService.toArtistDto(artist);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
