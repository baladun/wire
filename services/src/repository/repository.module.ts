import { Module } from '@nestjs/common';
import { RepositoryService } from './service/repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist, Genre, Media, Playlist, Session, Track, User } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Artist,
      Genre,
      Media,
      Track,
      User,
      Playlist,
      Session,
    ]),
  ],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
