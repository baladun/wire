import { Test, TestingModule } from '@nestjs/testing';
import { GenreMapperService } from './genre-mapper.service';

describe('GenreMapperService', () => {
  let service: GenreMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenreMapperService],
    }).compile();

    service = module.get<GenreMapperService>(GenreMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
