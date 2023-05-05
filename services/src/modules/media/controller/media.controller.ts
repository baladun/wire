import { Controller, Delete, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { MediaService } from '../services';
import { BufferInterceptor } from '@wire/core/interceptors';
import { BufferFile } from '@wire/core/decorators';
import { MediaDto } from '@wire/dto';

@Controller('media')
export class MediaController {

  constructor(
    private mediaService: MediaService,
  ) { }

  @Post('upload-image')
  @UseInterceptors(BufferInterceptor)
  uploadImage(@BufferFile() bufferFile: Buffer): Promise<MediaDto> {
    return this.mediaService.uploadImage(bufferFile);
  }

  @Post('upload-audio')
  @UseInterceptors(BufferInterceptor)
  uploadAudio(@BufferFile() bufferFile: Buffer): Promise<MediaDto> {
    return this.mediaService.uploadAudio(bufferFile);
  }

  // @Delete(':mediaId')
  // deleteImage(@Param('mediaId', ParseIntPipe) mediaId: number): Promise<MediaDto> {
  //
  // }
  //
  // @Delete(':mediaId')
  // deleteAudio(@Param('mediaId', ParseIntPipe) mediaId: number): Promise<MediaDto> {
  //
  // }
}
