import { Module } from '@nestjs/common';
import { ArtistController } from './controller/artist.controller';
import { ArtistService, ArtistValidationService } from './services';
import { RepositoryModule } from '@wire/repository';
import { MappersModule } from '@wire/mappers';

@Module({
  imports: [
    RepositoryModule,
    MappersModule,
  ],
  controllers: [
    ArtistController,
  ],
  providers: [
    ArtistService,
    ArtistValidationService,
  ],
})
export class ArtistModule {}
