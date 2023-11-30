import { Injectable } from '@nestjs/common';
import { Service } from '../interface/service.interface';
import { CarColor } from '../interface/car-color.interface';
import { colors } from '../constant/car-colors.constant';

@Injectable()
export class GetColorsService implements Service<{}, Promise<CarColor[]>> {
  async call(): Promise<CarColor[]> {
    return colors;
  }
}
