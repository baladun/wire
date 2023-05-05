import { Injectable } from '@nestjs/common';
import { MediaDto } from '@wire/dto';
import { Media } from '@wire/repository';

@Injectable()
export class MediaMapperService {

  toMediaDto(media: Media): MediaDto {
    if (!media) {
      return null;
    }

    return Object.assign(media, {});
  }
}
