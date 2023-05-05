import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ArtistDto, ArtistPageReqDto, ArtistPageResDto, DeleteArtistDto, UpsertArtistDto } from '@wire/dto';
import { RepositoryService } from '@wire/repository';
import { ArtistService } from '../services';

@Controller('artists')
export class ArtistController {

  constructor(
    private repository: RepositoryService,
    private artistsService: ArtistService,
  ) { }

  @Get()
  findAllArtists(@Query() query: ArtistPageReqDto): Promise<ArtistPageResDto> {
    return this.artistsService.findAll(query);
  }

  @Post()
  createArtist(@Body() dto: UpsertArtistDto): Promise<ArtistDto> {
    return this.artistsService.createArtist(dto);
  }

  @Put(':artistId')
  updateArtist(
    @Param('artistId', ParseIntPipe) artistId: number,
    @Body() dto: UpsertArtistDto
  ): Promise<ArtistDto> {
    return this.artistsService.updateArtist(artistId, dto);
  }

  @Delete(':artistId')
  deleteArtist(
    @Param('artistId', ParseIntPipe) artistId: number,
    @Body() dto: DeleteArtistDto,
  ): Promise<ArtistDto> {
    return this.artistsService.deleteArtist(artistId, dto);
  }
}
