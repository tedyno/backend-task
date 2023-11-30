import { Test, TestingModule } from '@nestjs/testing';
import { GetCarService } from './get-car.service';
import { GetCarsService } from './get-cars.service';
import { CacheModule } from '@nestjs/cache-manager';

describe('GetCarService', () => {
  let service: GetCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [GetCarService, GetCarsService],
    }).compile();

    service = module.get<GetCarService>(GetCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
