import { Test, TestingModule } from '@nestjs/testing';
import { ArtistMapperService } from './artist-mapper.service';

describe('ArtistMapperService', () => {
  let service: ArtistMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistMapperService],
    }).compile();

    service = module.get<ArtistMapperService>(ArtistMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
