import { Injectable } from '@nestjs/common';
import { CreateTrackDto, TrackDto, UpdateTrackDto } from '@wire/dto';
import { Artist, Genre, Media, Track } from '@wire/repository';
import { GenreMapperService } from '../genre/genre-mapper.service';
import { MediaMapperService } from '../media/media-mapper.service';

@Injectable()
export class TrackMapperService {

  constructor(
    private genreMapper: GenreMapperService,
    private mediaMapper: MediaMapperService,
  ) { }

  toTrackByCreate(dto: CreateTrackDto, genres: Genre[], artist: Artist, audioMedia: Media, coverMedia: Media): Track {
    const track = new Track();
    track.title = dto.title;
    track.artist = artist;
    track.year = dto.year;
    track.durationInSec = dto.durationInSec;
    track.audio = audioMedia;
    track.cover = coverMedia || null;
    track.genres = genres;

    return track;
  }

  toTrackByUpdate(dto: UpdateTrackDto, trackId: number, curTrack: Track, genres: Genre[], artist: Artist, coverMedia: Media): Track {
    const track = new Track();
    track.trackId = trackId;
    track.title = dto.title;
    track.artist = artist;
    track.year = curTrack.year;
    track.durationInSec = curTrack.durationInSec;
    track.audio = curTrack.audio;
    track.cover = coverMedia || null;
    track.genres = genres;

    return track;
  }

  toTrackDto(track: Track): TrackDto {
    const dto = new TrackDto();
    dto.trackId = track.trackId;
    dto.title = track.title;
    dto.artist = track.artist;
    dto.year = track.year;
    dto.durationInSec = track.durationInSec;
    dto.audio = this.mediaMapper.toMediaDto(track.audio);
    dto.genres = (track.genres || []).map(el => this.genreMapper.toGenreDto(el));
    dto.cover = this.mediaMapper.toMediaDto(track.cover);
    dto.createdAt = track.createdAt;

    return dto;
  }
}
