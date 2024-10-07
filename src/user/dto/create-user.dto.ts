import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  Matches,
  Min,
} from 'class-validator';
import { ValidationMessages } from '../validation_messages';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: ValidationMessages.USERNAME_MIN_LENGTH })
  username: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/, {
    message: ValidationMessages.PASSWORD_COMPLEXITY,
  })
  password: string;

  @IsNotEmpty()
  @IsEmail({}, { message: ValidationMessages.INVALID_EMAIL })
  email: string;

  @IsNotEmpty()
  @IsNumber({}, { message: ValidationMessages.GENDER_NUMBER })
  gender: number;

  @IsNotEmpty()
  @IsNumber()
  @Matches(/^\d{10}$/, { message: ValidationMessages.PHONE_NUMBER_FORMAT })
  phonenumber: number;

  @IsNotEmpty()
  @IsNumber({}, { message: ValidationMessages.AGE_NUMBER })
  @Min(18, { message: ValidationMessages.AGE_MIN })
  age: number;
}
