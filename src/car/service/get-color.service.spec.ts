import { Test, TestingModule } from '@nestjs/testing';
import { GetColorService } from './get-color.service';
import { GetColorsService } from './get-colors.service';

describe('GetColorService', () => {
  let service: GetColorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetColorService, GetColorsService],
    }).compile();

    service = module.get<GetColorService>(GetColorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
