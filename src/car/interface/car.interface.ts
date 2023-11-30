import { CarColor } from './car-color.interface';

export interface Car {
  id: string;
  make: string;
  model: string;
  buildDate: string;
  colorId: CarColor['id'];
}
