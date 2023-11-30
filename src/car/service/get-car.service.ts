import { Inject, Injectable } from '@nestjs/common';
import { Service } from '../interface/service.interface';
import { Car } from '../interface/car.interface';
import { GetCarsService } from './get-cars.service';

@Injectable()
export class GetCarService implements Service<Car['id'], Promise<Car | null>> {
  constructor(@Inject(GetCarsService) private getCars: GetCarsService) {}

  public async call(id: Car['id']): Promise<Car | null> {
    const cars = await this.getCars.call();

    return cars.find(car => car.id === id) || null;
  }
}
