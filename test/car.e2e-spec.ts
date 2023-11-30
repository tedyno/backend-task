import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CarModule } from '../src/car/car.module';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Car } from '../src/car/interface/car.interface';
import { v4 } from 'uuid';
import { CreateCarService } from '../src/car/service/create-car.service';

describe('Cats', () => {
  let app: INestApplication;
  let cache: Cache;
  let createCarService: CreateCarService;
  const validCar: Omit<Car, 'id'> = {
    make: 'Subaru',
    model: 'Impreza',
    buildDate: '2023-11-30T14:11:51.002Z',
    colorId: 'black',
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CarModule],
    }).compile();

    cache = module.get<Cache>(CACHE_MANAGER);
    createCarService = module.get<CreateCarService>(CreateCarService);
    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
  });

  describe('GET /cars', () => {
    it('returns no cars', async () => {
      await request(app.getHttpServer()).get('/cars').expect(200).expect([]);
    });

    it('returns cars', async () => {
      const car = await createCarService.call(validCar);
      expect(car).toMatchObject(validCar);

      await request(app.getHttpServer()).get('/cars').expect(200).expect([car]);
    });
  });

  describe('GET /cars/:id', () => {
    it('returns car', async () => {
      const car = await createCarService.call(validCar);

      await request(app.getHttpServer()).get(`/cars/${car.id}`).expect(200).expect(car);
    });

    it('throws 404 when car is not found', async () => {
      await request(app.getHttpServer()).get(`/cars/${v4()}`).expect(404);
    });
  });

  describe('POST /cars/:id', () => {
    it('creates car', async () => {
      const response = await request(app.getHttpServer()).post('/cars').send(validCar).expect(201);
      const car = response.body;
      await request(app.getHttpServer()).get(`/cars/${car.id}`).expect(200).expect(car);
    });

    it('throws 400 when car color is invalid', async () => {
      await request(app.getHttpServer())
        .post('/cars')
        .send({
          ...validCar,
          colorId: 'pink',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: ['colorId must be a valid colorId'],
          error: 'Bad Request',
        });
    });

    it('throws 400 when make is missing', async () => {
      await request(app.getHttpServer())
        .post('/cars')
        .send({
          ...validCar,
          make: undefined,
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: ['make should not be empty', 'make must be a string'],
          error: 'Bad Request',
        });
    });

    it('throws 400 when model is missing', async () => {
      await request(app.getHttpServer())
        .post('/cars')
        .send({
          ...validCar,
          model: undefined,
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: ['model should not be empty', 'model must be a string'],
          error: 'Bad Request',
        });
    });

    it('throws 400 when buildDate is missing', async () => {
      await request(app.getHttpServer())
        .post('/cars')
        .send({
          ...validCar,
          buildDate: undefined,
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: [
            'buildDate should not be empty',
            'buildDate must be a valid ISO 8601 date string',
          ],
          error: 'Bad Request',
        });
    });

    it('throws 400 when buildDate is invalid', async () => {
      await request(app.getHttpServer())
        .post('/cars')
        .send({
          ...validCar,
          buildDate: '24/2/2024',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: ['buildDate must be a valid ISO 8601 date string'],
          error: 'Bad Request',
        });
    });
  });

  describe('DELETE /cars/:id', () => {
    it('deletes car', async () => {
      const car = await createCarService.call(validCar);

      await request(app.getHttpServer()).delete(`/cars/${car.id}`).expect(200);
      await request(app.getHttpServer()).get(`/cars/${car.id}`).expect(404);
    });

    it('throws 404 when car is not found', async () => {
      await request(app.getHttpServer()).get(`/cars/${v4()}`).expect(404);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
