import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { IsValidColorId } from '../decorator/is-valid-color-id.decorator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsDateString()
  @IsNotEmpty()
  buildDate: string;

  @IsNotEmpty()
  @IsValidColorId()
  colorId: string;
}
