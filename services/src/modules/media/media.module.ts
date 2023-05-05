import { Module } from '@nestjs/common';
import { MediaController } from './controller/media.controller';
import { MediaService, MediaValidationService } from './services';
import { RepositoryModule } from '@wire/repository';
import { MappersModule } from '@wire/mappers';

@Module({
  controllers: [
    MediaController,
  ],
  imports: [
    RepositoryModule,
    MappersModule,
  ],
  providers: [
    MediaService,
    MediaValidationService,
  ],
})
export class MediaModule {}
