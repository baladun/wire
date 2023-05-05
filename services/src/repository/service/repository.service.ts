import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist, Genre, Media, Session, Track, User } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class RepositoryService {

  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
    @InjectRepository(Media) private mediaRepository: Repository<Media>,
    @InjectRepository(Track) private trackRepository: Repository<Track>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) { }

  get artist(): Repository<Artist> {
    return this.artistRepository;
  }

  get genre(): Repository<Genre> {
    return this.genreRepository;
  }

  get media(): Repository<Media> {
    return this.mediaRepository;
  }

  get track(): Repository<Track> {
    return this.trackRepository;
  }

  get user(): Repository<User> {
    return this.userRepository;
  }

  get session(): Repository<Session> {
    return this.sessionRepository;
  }
}
