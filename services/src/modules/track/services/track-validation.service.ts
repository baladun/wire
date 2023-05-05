import { BadRequestException, Injectable } from '@nestjs/common';
import { ExceptionMessage, ExceptionTypes } from '@wire/core/exception';
import { In } from 'typeorm';
import { Artist, Genre, Media, RepositoryService, Track } from '@wire/repository';
import { UpsertArtistDto } from '@wire/dto';

@Injectable()
export class TrackValidationService {

  constructor(
    private repository: RepositoryService,
  ) { }

  async checkAudio(audioId: number): Promise<Media> {
    const media = await this.repository.media.findOneBy({ mediaId: audioId });
    const mediaAlreadyRelatedToAnotherTrack = await this.repository.track.findOneBy({ audio: media });

    if (!media) {
      throw new BadRequestException([
        new ExceptionMessage('audioId', ExceptionTypes.NotExist),
      ]);
    }

    if (!media.contentType.includes('audio')) {
      throw new BadRequestException([
        new ExceptionMessage('audioId', 'MIME contentType is incorrect'),
      ]);
    }

    if (mediaAlreadyRelatedToAnotherTrack) {
      throw new BadRequestException([
        new ExceptionMessage('audioId', 'Already related to another track'),
      ]);
    }

    return media;
  }

  async checkCover(coverId: number): Promise<Media> {
    if (!coverId) {
      return;
    }

    const media = await this.repository.media.findOneBy({ mediaId: coverId });

    if (!media) {
      throw new BadRequestException([
        new ExceptionMessage('coverId', ExceptionTypes.NotExist),
      ]);
    }

    if (!media.contentType.includes('image')) {
      throw new BadRequestException([
        new ExceptionMessage('coverId', 'MIME contentType is incorrect'),
      ]);
    }

    return media;
  }

  async existsByGenreIds(genreIds: number[]): Promise<Genre[]> {
    const exist = await this.repository.genre.find({ where: { genreId: In(genreIds) } });
    if (exist?.length !== genreIds.length) {
      throw new BadRequestException([
        new ExceptionMessage<UpsertArtistDto>('genreIds', ExceptionTypes.SomeNotExist),
      ]);
    }

    return exist;
  }

  async existsByArtistId(artistId: number): Promise<Artist> {
    const artist = await this.repository.artist.findOneBy({ artistId });

    if (!artist) {
      throw new BadRequestException([
        new ExceptionMessage('artistId', ExceptionTypes.NotExist),
      ]);
    }

    return artist;
  }

  async existsByTrackId(trackId: number): Promise<Track> {
    const track = await this.repository.track.findOneById(trackId);

    if (!track) {
      throw new BadRequestException([
        new ExceptionMessage('trackId', ExceptionTypes.NotExist),
      ]);
    }

    return track;
  }
}
