import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MediaValidationService {

  validateForImage(contentType: string): void {
    if (!contentType.includes('image')) {
      throw new BadRequestException('Invalid file');
    }
  }

  validateForAudio(contentType: string): void {
    if (!contentType.includes('audio')) {
      throw new BadRequestException('Invalid file');
    }
  }
}
