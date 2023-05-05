import { BadRequestException, Injectable } from '@nestjs/common';
import Buffer from 'buffer';
import * as id3 from 'node-id3';
import { Tags } from 'node-id3';
import {
  CreateTrackDto,
  TrackDto,
  TrackMetadataCoverDto,
  TrackMetadataDto,
  TrackPageReqDto,
  TrackPageResDto,
  UpdateTrackDto,
} from '@wire/dto';
import * as mp3Duration from 'mp3-duration';
import { detectMimeType, getAudioExtensionByMimeType } from '@wire/shared/utils';
import { TrackValidationService } from './track-validation.service';
import { BucketService, PageableService } from '@wire/core/services';
import { RepositoryService, Track } from '@wire/repository';
import { TrackMapperService } from '@wire/mappers';
import { Brackets } from 'typeorm';

@Injectable()
export class TrackService {

  constructor(
    private validationService: TrackValidationService,
    private bucketsService: BucketService,
    private repository: RepositoryService,
    private mapperService: TrackMapperService,
    private pageable: PageableService,
  ) { }

  async findAll({
    page,
    size,
    sort,
    search,
    trackIds,
    artistIds,
    genreIds,
    yearFrom,
    yearTo,
  }: TrackPageReqDto): Promise<TrackPageResDto> {
    try {
      const trackAlias = 'track';
      const artistAlias = 'artist';
      const genreAlias = 'genre';

      const totalSelect = this.repository.track
        .createQueryBuilder(trackAlias)
        .leftJoinAndSelect(`${trackAlias}.artist`, artistAlias)
        .leftJoinAndSelect(`${trackAlias}.genres`, genreAlias)
        .where(
          new Brackets(db => {
            db.where({ title: this.pageable.toSearchPattern(search) });
            if (trackIds?.length) {
              db.andWhere(`${trackAlias}.trackId IN (:...trackIds)`, { trackIds });
            }
            if (artistIds?.length) {
              db.andWhere(`${artistAlias}.artistId IN (:...artistIds)`, { artistIds });
            }
            if (genreIds?.length) {
              db.andWhere(`${genreAlias}.genreId IN (:...genreIds)`, { genreIds });
            }
            if (yearFrom) {
              db.andWhere(`${trackAlias}.year >= :yearFrom`, { yearFrom });
            }
            if (yearTo) {
              db.andWhere(`${trackAlias}.year <= :yearTo`, { yearTo });
            }
          })
        )
        .orderBy(this.pageable.toOrderBy(sort, trackAlias))
      ;
      const { entities, metadata } = await this.pageable.getPage<Track>({ totalSelect, page, size, sort });

      return {
        content: entities.map(el => this.mapperService.toTrackDto(el)),
        ...metadata,
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createTrack(dto: CreateTrackDto): Promise<TrackDto> {
    const audioMedia = await this.validationService.checkAudio(dto.audioId);
    const coverMedia = await this.validationService.checkCover(dto.coverId);
    const genres = await this.validationService.existsByGenreIds(dto.genreIds);
    const artist = await this.validationService.existsByArtistId(dto.artistId);

    const audioRes = await this.bucketsService.audiosBucket.file(String(dto.audioId)).download();
    const coverRes = coverMedia ? await this.bucketsService.imagesBucket.file(String(dto.coverId)).download() : null;
    const audioBuffer = audioRes[0];
    const coverBuffer = (coverRes || [])[0] || null;

    try {
      const updatedAudioBuffer = id3.update({
        title: dto.title,
        artist: artist.name,
        genre: genres.map(genre => `(${genre.id3})`).join(''),
        image: !coverBuffer ?
          null :
          {
            mime: coverMedia.contentType,
            type: {
              id: 3,
              name: 'front cover',
            },
            description: '',
            imageBuffer: coverBuffer,
          },
        userDefinedText: [{
          description: 'ARTISTS',
          value: artist.name,
        }],
        album: null,
        performerInfo: null,
        trackNumber: null,
        partOfSet: null,
        publisher: null,
      }, audioBuffer);

      const blob = this.bucketsService.audiosBucket.file(String(dto.audioId));
      const blobStream = blob.createWriteStream({
        contentType: audioMedia.contentType,
        metadata: {
          contentDisposition: `attachment; filename="${artist.name} – ${dto.title}.${getAudioExtensionByMimeType(audioMedia.contentType)}"`,
          cacheControl: 'max-age=1209600',
        },
      });

      return new Promise(resolve => {
        blobStream.on('finish', () => {
          resolve(void 0);
        });

        blobStream.end(updatedAudioBuffer);
      })
        .then(() => this.repository.track.save(this.mapperService.toTrackByCreate(dto, genres, artist, audioMedia, coverMedia)))
        .then(track => this.mapperService.toTrackDto(track));
    } catch (e) {
      throw new BadRequestException('Could not create track');
    }
  }

  async extractMetadata(buffer: Buffer): Promise<TrackMetadataDto> {
    try {
      const {
        title,
        artist,
        genre,
        year,
        image,
      } = id3.read(buffer);

      return {
        title,
        artist,
        genre,
        year: Number(year),
        durationInSec: await this.detectDuration(buffer),
        mimeType: await detectMimeType(buffer),
        imageCover: this.extractCover(image),
      };
    } catch (e) {
      throw new BadRequestException('Could not extract metadata');
    }
  }

  async updateTrack(trackId: number, dto: UpdateTrackDto): Promise<TrackDto> {
    const curTrack = await this.validationService.existsByTrackId(trackId);
    const artist = await this.validationService.existsByArtistId(dto.artistId);
    const coverMedia = await this.validationService.checkCover(dto.coverId);
    const genres = await this.validationService.existsByGenreIds(dto.genreIds);

    const filled = this.mapperService.toTrackByUpdate(dto, trackId, curTrack, genres, artist, coverMedia);
    const updated = await this.repository.track.save(filled);

    return this.mapperService.toTrackDto(updated);
  }

  async deleteTrack(trackId: number): Promise<TrackDto> {
    const track = await this.validationService.existsByTrackId(trackId);
    await this.repository.track.delete(track.trackId);
    await this.repository.media.delete(track.audio.mediaId);
    await this.bucketsService.audiosBucket.file(String(track.audio.mediaId)).delete();

    return this.mapperService.toTrackDto(track);
  }

  private detectDuration(buffer: Buffer): Promise<number> {
    return new Promise((res, rej) => {
      mp3Duration(buffer, (err, duration) => {
        if (err) {
          rej(err);
        }

        res(Math.round(duration));
      });
    });
  }

  private extractCover(image: Tags['image']): TrackMetadataCoverDto {
    if (typeof image === 'string') {
      return null;
    }

    return {
      mimeType: image.mime,
      buffer: image.imageBuffer.toJSON().data,
    };
  }
}
