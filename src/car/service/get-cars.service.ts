import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Car } from '../interface/car.interface';
import { Service } from '../interface/service.interface';

@Injectable()
export class GetCarsService implements Service<{}, Promise<Car[]>> {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async call(): Promise<Car[]> {
    const cars = await this.cacheManager.get<Car[]>('cars');
    return cars || [];
  }
}
