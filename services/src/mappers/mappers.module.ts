import { Module } from '@nestjs/common';
import { ArtistMapperService } from './artist/artist-mapper.service';
import { GenreMapperService } from './genre/genre-mapper.service';
import { MediaMapperService } from './media/media-mapper.service';
import { TrackMapperService } from './track/track-mapper.service';
import { UserMapperService } from './user/user-mapper.service';

@Module({
  providers: [
    ArtistMapperService,
    GenreMapperService,
    MediaMapperService,
    TrackMapperService,
    UserMapperService,
  ],
  exports: [
    ArtistMapperService,
    GenreMapperService,
    MediaMapperService,
    TrackMapperService,
    UserMapperService,
  ],
})
export class MappersModule {}
