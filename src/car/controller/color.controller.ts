import { Controller, Get, Inject } from '@nestjs/common';
import { CarColor } from '../interface/car-color.interface';
import { GetColorsService } from '../service/get-colors.service';

@Controller('colors')
export class ColorController {
  constructor(@Inject(GetColorsService) private getColors: GetColorsService) {}

  @Get()
  async getColorsHandler(): Promise<CarColor[]> {
    return this.getColors.call();
  }
}
