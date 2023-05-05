import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { CreateTrackDto, TrackDto, TrackMetadataDto, TrackPageReqDto, TrackPageResDto, UpdateTrackDto } from '@wire/dto';
import { BufferFile } from '@wire/core/decorators';
import id3, { Tags } from 'node-id3';
import { BufferInterceptor } from '@wire/core/interceptors';
import { TrackService } from '../services';

@Controller('tracks')
export class TrackController {

  constructor(
    private tracksService: TrackService
  ) { }

  @Get()
  findAllTracks(@Query() query: TrackPageReqDto): Promise<TrackPageResDto> {
    return this.tracksService.findAll(query);
  }

  @Post()
  createTrack(@Body() dto: CreateTrackDto): Promise<TrackDto> {
    return this.tracksService.createTrack(dto);
  }

  @Put(':trackId')
  updateTrack(
    @Param('trackId', ParseIntPipe) trackId: number,
    @Body() dto: UpdateTrackDto
  ): Promise<TrackDto> {
    return this.tracksService.updateTrack(trackId, dto);
  }

  @Delete(':trackId')
  deleteTrack(@Param('trackId', ParseIntPipe) trackId: number): Promise<TrackDto> {
    return this.tracksService.deleteTrack(trackId);
  }

  @Post('extract-metadata')
  @UseInterceptors(BufferInterceptor)
  extractMetadata(@BufferFile() bufferFile: Buffer): Promise<TrackMetadataDto> {
    return this.tracksService.extractMetadata(bufferFile);
  }

  @Post('extract-raw-tags')
  @UseInterceptors(BufferInterceptor)
  extractRawTags(@BufferFile() bufferFile: Buffer): Tags {
    return id3.read(bufferFile);
  }
}
