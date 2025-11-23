import { Test, TestingModule } from '@nestjs/testing';
import { CheckitemController } from './checkitem.controller';
import { CheckitemService } from './checkitem.service';

describe('CheckitemController', () => {
  let controller: CheckitemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckitemController],
      providers: [CheckitemService],
    }).compile();

    controller = module.get<CheckitemController>(CheckitemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
