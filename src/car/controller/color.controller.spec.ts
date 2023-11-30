import { Test, TestingModule } from '@nestjs/testing';
import { CarModule } from '../car.module';
import { ColorController } from './color.controller';
import { colors } from '../constant/car-colors.constant';

describe('CarController', () => {
  let controller: ColorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CarModule],
      controllers: [],
      providers: [],
    }).compile();

    controller = module.get<ColorController>(ColorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET /colors', async () => {
    expect(await controller.getColorsHandler()).toEqual(colors);
  });
});
