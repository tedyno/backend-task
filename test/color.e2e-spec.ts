import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CarModule } from '../src/car/car.module';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Car } from '../src/car/interface/car.interface';
import { v4 } from 'uuid';
import { CreateCarService } from '../src/car/service/create-car.service';
import { colors } from '../src/car/constant/car-colors.constant';

describe('Cats', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CarModule],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
  });

  it('GET /colors', async () => {
    await request(app.getHttpServer()).get('/colors').expect(200).expect(colors);
  });

  afterAll(async () => {
    await app.close();
  });
});
