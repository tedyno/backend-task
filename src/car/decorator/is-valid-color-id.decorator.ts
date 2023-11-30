import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { colors } from '../constant/car-colors.constant';

export function IsValidColorId(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isValidColorId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return colors.some(color => color.id === value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid ${args.property}`;
        },
      },
    });
  };
}
