import { Test, TestingModule } from '@nestjs/testing';
import { GenresValidationService } from './genres-validation.service';

describe('GenresValidationService', () => {
  let service: GenresValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenresValidationService],
    }).compile();

    service = module.get<GenresValidationService>(GenresValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
