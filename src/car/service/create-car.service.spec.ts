import { Test, TestingModule } from '@nestjs/testing';
import { CreateCarService } from './create-car.service';
import { CacheModule } from '@nestjs/cache-manager';
import { GetCarsService } from './get-cars.service';

describe('CreateCarService', () => {
  let service: CreateCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [CreateCarService, GetCarsService],
    }).compile();

    service = module.get<CreateCarService>(CreateCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
