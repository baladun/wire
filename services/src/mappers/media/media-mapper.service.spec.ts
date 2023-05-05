import { Test, TestingModule } from '@nestjs/testing';
import { MediaMapperService } from './media-mapper.service';

describe('MediaMapperService', () => {
  let service: MediaMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaMapperService],
    }).compile();

    service = module.get<MediaMapperService>(MediaMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
