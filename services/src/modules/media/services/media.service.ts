import { BadRequestException, Injectable } from '@nestjs/common';
import { detectMimeType } from '@wire/shared/utils';
import { MediaValidationService } from './media-validation.service';
import { BucketService } from '@wire/core/services';
import { RepositoryService } from '@wire/repository';
import { MediaDto } from '@wire/dto';
import { MediaMapperService } from '@wire/mappers';

@Injectable()
export class MediaService {

  constructor(
    private validationService: MediaValidationService,
    private repository: RepositoryService,
    private mediaMapper: MediaMapperService,
    private bucketsService: BucketService,
  ) { }

  async uploadImage(buffer: Buffer): Promise<MediaDto> {
    const contentType = await detectMimeType(buffer);
    this.validationService.validateForImage(contentType);

    try {
      const media = await this.repository.media.save({ contentType });
      const name = String(media.mediaId);
      const blob = this.bucketsService.imagesBucket.file(name);
      const blobStream = blob.createWriteStream({
        contentType: await detectMimeType(buffer),
      });

      return new Promise(resolve => {
        blobStream.on('finish', () => {
          resolve(this.mediaMapper.toMediaDto(media));
        });

        blobStream.end(buffer);
      });
    } catch (e) {
      throw new BadRequestException('Could not upload file');
    }
  }

  async uploadAudio(buffer: Buffer): Promise<MediaDto> {
    const contentType = await detectMimeType(buffer);
    this.validationService.validateForAudio(contentType);

    try {
      const media = await this.repository.media.save({ contentType });
      const name = String(media.mediaId);
      const blob = this.bucketsService.audiosBucket.file(name);
      const blobStream = blob.createWriteStream({
        contentType: await detectMimeType(buffer),
      });

      return new Promise(resolve => {
        blobStream.on('finish', () => {
          resolve(this.mediaMapper.toMediaDto(media));
        });

        blobStream.end(buffer);
      });
    } catch (e) {
      throw new BadRequestException('Could not upload file');
    }
  }
}
