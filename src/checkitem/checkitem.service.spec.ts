import { Test, TestingModule } from '@nestjs/testing';
import { CheckitemService } from './checkitem.service';

describe('CheckitemService', () => {
  let service: CheckitemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckitemService],
    }).compile();

    service = module.get<CheckitemService>(CheckitemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
