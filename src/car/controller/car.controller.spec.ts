import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from './car.controller';
import { Cache } from 'cache-manager';
import { Car } from '../interface/car.interface';
import { v4 } from 'uuid';
import { CarModule } from '../car.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('CarController', () => {
  let controller: CarController;
  let cache: Cache;
  const validCar: Car = {
    id: v4(),
    make: 'Subaru',
    model: 'Impreza',
    buildDate: '2023-11-30T14:11:51.002Z',
    colorId: 'black',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CarModule],
      controllers: [],
      providers: [],
    }).compile();

    controller = module.get<CarController>(CarController);
    cache = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /cars', () => {
    it('returns cars', async () => {
      await cache.set('cars', [validCar]);
      expect(await controller.getCarsHandler()).toEqual([validCar]);
    });
  });

  describe('GET /cars/:id', () => {
    it('returns car', async () => {
      await cache.set('cars', [validCar]);
      expect(await controller.getCarHandler(validCar.id)).toEqual(validCar);
    });

    it('throws 404 when car is not found', async () => {
      try {
        await controller.getCarHandler(v4());
        fail();
      } catch (e) {
        expect(await e.response.statusCode).toEqual(404);
      }
    });
  });

  describe('POST /cars/:id', () => {
    it('creates car', async () => {
      expect(await controller.getCarsHandler()).toEqual([]);
      expect(await controller.createCarHandler(validCar)).toEqual(validCar);
      expect(await controller.getCarsHandler()).toEqual([validCar]);
    });
  });

  describe('DELETE /cars/:id', () => {
    it('deletes car', async () => {
      await cache.set('cars', [validCar]);
      expect(await controller.getCarHandler(validCar.id)).toEqual(validCar);

      await controller.deleteCarHandler(validCar.id);
      try {
        await controller.getCarHandler(validCar.id);
        fail();
      } catch (e) {
        expect(await e.response.statusCode).toEqual(404);
      }
    });

    it('throws 404 when car is not found', async () => {
      try {
        await controller.deleteCarHandler(v4());
        fail();
      } catch (e) {
        expect(await e.response.statusCode).toEqual(404);
      }
    });
  });
});
