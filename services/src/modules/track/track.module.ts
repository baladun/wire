import { Module } from '@nestjs/common';
import { TrackController } from './controller/track.controller';
import { TrackService, TrackValidationService } from './services';
import { RepositoryModule } from '@wire/repository';
import { MappersModule } from '@wire/mappers';

@Module({
  imports: [
    RepositoryModule,
    MappersModule,
  ],
  controllers: [
    TrackController,
  ],
  providers: [
    TrackService,
    TrackValidationService,
  ],
})
export class TrackModule {}
