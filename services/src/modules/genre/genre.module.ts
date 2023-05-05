import { Module } from '@nestjs/common';
import { GenreController } from './controller/genre.controller';
import { GenresService, GenresValidationService } from './services';
import { RepositoryModule } from '@wire/repository';
import { MappersModule } from '@wire/mappers';

@Module({
  imports: [
    RepositoryModule,
    MappersModule,
  ],
  controllers: [
    GenreController,
  ],
  providers: [
    GenresService,
    GenresValidationService,
  ],
})
export class GenreModule {}
