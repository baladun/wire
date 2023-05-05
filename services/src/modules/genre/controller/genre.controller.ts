import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { GenresService } from '../services';
import { GenreDto, GenrePageReqDto, GenrePageResDto, UpsertGenreDto } from '@wire/dto';

@Controller('genres')
export class GenreController {

  constructor(
    private genreService: GenresService
  ) { }

  @Get()
  findAllGenres(@Query() query: GenrePageReqDto): Promise<GenrePageResDto> {
    return this.genreService.findAll(query);
  }

  @Post()
  createGenre(@Body() dto: UpsertGenreDto): Promise<GenreDto> {
    return this.genreService.createGenre(dto);
  }

  @Put(':genreId')
  updateGenre(
    @Param('genreId', ParseIntPipe) genreId: number,
    @Body() dto: UpsertGenreDto
  ): Promise<GenreDto> {
    return this.genreService.updateGenre(genreId, dto);
  }

  @Delete(':genreId')
  deleteGenre(@Param('genreId', ParseIntPipe) genreId: number): Promise<GenreDto> {
    return this.genreService.deleteGenre(genreId);
  }
}
