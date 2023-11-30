import { Test, TestingModule } from '@nestjs/testing';
import { GetColorsService } from './get-colors.service';
import { CacheModule } from '@nestjs/cache-manager';

describe('GetColorsService', () => {
  let service: GetColorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [GetColorsService],
    }).compile();

    service = module.get<GetColorsService>(GetColorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
