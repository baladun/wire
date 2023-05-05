import { Test, TestingModule } from '@nestjs/testing';
import { AuthValidationService } from './auth-validation.service';

describe('AuthValidationService', () => {
  let service: AuthValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthValidationService],
    }).compile();

    service = module.get<AuthValidationService>(AuthValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
