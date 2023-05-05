import { Test, TestingModule } from '@nestjs/testing';
import { ArtistValidationService } from './artist-validation.service';

describe('ArtistValidationService', () => {
  let service: ArtistValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistValidationService],
    }).compile();

    service = module.get<ArtistValidationService>(ArtistValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
