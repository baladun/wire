import { Test, TestingModule } from '@nestjs/testing';
import { MediaValidationService } from './media-validation.service';

describe('MediaValidationService', () => {
  let service: MediaValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaValidationService],
    }).compile();

    service = module.get<MediaValidationService>(MediaValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
