import { Test, TestingModule } from '@nestjs/testing';
import { SunController } from './sun.controller';

describe('Sun Controller', () => {
  let controller: SunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SunController],
    }).compile();

    controller = module.get<SunController>(SunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
