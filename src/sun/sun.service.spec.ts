import { Test, TestingModule } from '@nestjs/testing';
import { SunService } from './sun.service';

describe('SunService', () => {
  let service: SunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SunService],
    }).compile();

    service = module.get<SunService>(SunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
