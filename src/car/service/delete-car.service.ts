import { Inject, Injectable } from '@nestjs/common';
import { Service } from '../interface/service.interface';
import { Car } from '../interface/car.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class DeleteCarService implements Service<Car['id'], Promise<void>> {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async call(id: Car['id']): Promise<void> {
    const cars = await this.cacheManager.get<Car[]>('cars');

    const newCars = cars.filter(car => car.id !== id);
    await this.cacheManager.set('cars', newCars, 0);
    return;
  }
}
