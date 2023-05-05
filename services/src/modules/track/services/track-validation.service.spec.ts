import { Test, TestingModule } from '@nestjs/testing';
import { TrackValidationService } from './track-validation.service';

describe('TrackValidationService', () => {
  let service: TrackValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackValidationService],
    }).compile();

    service = module.get<TrackValidationService>(TrackValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
