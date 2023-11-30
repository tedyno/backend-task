import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Car } from '../interface/car.interface';
import { GetCarsService } from '../service/get-cars.service';
import { GetCarService } from '../service/get-car.service';
import { CreateCarService } from '../service/create-car.service';
import { DeleteCarService } from '../service/delete-car.service';
import { CreateCarDto } from '../dto/create-car.dto';

@Controller('cars')
export class CarController {
  constructor(
    @Inject(GetCarsService) private getCars: GetCarsService,
    @Inject(GetCarService) private getCar: GetCarService,
    @Inject(CreateCarService) private createCar: CreateCarService,
    @Inject(DeleteCarService) private deleteCar: DeleteCarService,
  ) {}

  @Get()
  async getCarsHandler(): Promise<Car[]> {
    return this.getCars.call();
  }

  @Get(':id')
  async getCarHandler(@Param('id') id: Car['id']): Promise<Car> {
    const car = await this.getCar.call(id);
    if (car) {
      return car;
    }

    throw new NotFoundException('Car not found');
  }

  @Post()
  async createCarHandler(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.createCar.call(createCarDto);
  }

  @Delete(':id')
  async deleteCarHandler(@Param('id') id: string): Promise<void> {
    const car = await this.getCar.call(id);
    if (car) {
      return this.deleteCar.call(car.id);
    }

    throw new NotFoundException('Car not found');
  }
}
