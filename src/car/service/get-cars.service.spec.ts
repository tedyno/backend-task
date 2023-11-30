import { Test, TestingModule } from '@nestjs/testing';
import { GetCarsService } from './get-cars.service';
import { CacheModule } from '@nestjs/cache-manager';

describe('GetCarsService', () => {
  let service: GetCarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [GetCarsService],
    }).compile();

    service = module.get<GetCarsService>(GetCarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
