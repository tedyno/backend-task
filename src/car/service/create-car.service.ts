import { Inject, Injectable } from '@nestjs/common';
import { Service } from '../interface/service.interface';
import { Car } from '../interface/car.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 } from 'uuid';
import { GetCarsService } from './get-cars.service';
import { CreateCarDto } from '../dto/create-car.dto';

@Injectable()
export class CreateCarService implements Service<CreateCarDto, Promise<Car>> {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(GetCarsService) private getCars: GetCarsService,
  ) {}

  async call(createCarDto: CreateCarDto): Promise<Car> {
    const car: Car = {
      id: v4(),
      ...createCarDto,
    };
    const cars = await this.getCars.call();
    cars.push(car);

    await this.cacheManager.set('cars', cars, 0);

    return car;
  }
}
