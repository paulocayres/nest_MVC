import { Test, TestingModule } from '@nestjs/testing';
import { DummyController } from './dummy.controller';

describe('Dummy Controller', () => {
  let controller: DummyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DummyController],
    }).compile();

    controller = module.get<DummyController>(DummyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
