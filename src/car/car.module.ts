import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CarController } from './controller/car.controller';
import { GetCarService } from './service/get-car.service';
import { CreateCarService } from './service/create-car.service';
import { DeleteCarService } from './service/delete-car.service';
import { GetCarsService } from './service/get-cars.service';
import { ColorController } from './controller/color.controller';
import { GetColorsService } from './service/get-colors.service';
import { GetColorService } from './service/get-color.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [CarController, ColorController],
  providers: [
    CreateCarService,
    GetCarService,
    DeleteCarService,
    GetCarsService,
    GetColorsService,
    GetColorService,
  ],
})
export class CarModule {}
