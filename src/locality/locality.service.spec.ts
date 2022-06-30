import { Test, TestingModule } from '@nestjs/testing';
import { LocalityService } from './locality.service';

describe('LocalityService', () => {
  let service: LocalityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalityService],
    }).compile();

    service = module.get<LocalityService>(LocalityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
