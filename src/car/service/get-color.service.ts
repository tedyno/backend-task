import { Inject, Injectable } from '@nestjs/common';
import { Service } from '../interface/service.interface';
import { CarColor } from '../interface/car-color.interface';
import { GetColorsService } from './get-colors.service';

@Injectable()
export class GetColorService implements Service<CarColor['id'], Promise<CarColor | null>> {
  constructor(@Inject(GetColorsService) private getColors: GetColorsService) {}

  async call(id: CarColor['id']): Promise<CarColor | null> {
    const colors = await this.getColors.call();

    return colors.find(color => color.id === id) || null;
  }
}
