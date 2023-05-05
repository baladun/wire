import { Test, TestingModule } from '@nestjs/testing';
import { TrackMapperService } from './track-mapper.service';

describe('TrackMapperService', () => {
  let service: TrackMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackMapperService],
    }).compile();

    service = module.get<TrackMapperService>(TrackMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
