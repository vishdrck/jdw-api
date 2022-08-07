import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PAYMENT_STATUS, PAYMENT_TYPES } from '../constants/enum';
import { IPaymentHistory } from '../models/payment.model';
import { CreatePaymentRequestDto } from './create-payment-request.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentRequestDto) {
  @ApiProperty({ example: '01/05/2022 12:15PM' })
  @IsDate()
  @IsOptional()
  dueDate: Date;

  @ApiProperty({ example: 'REGISTRATION_FEE' })
  @IsNotEmpty()
  @IsEnum(PAYMENT_TYPES)
  paymentType: PAYMENT_TYPES;

  @ApiProperty({ example: [{ paidAmount: 1000, date: '01/05/2022 12:15PM' }] })
  @IsArray()
  @IsOptional()
  paymentHistory: [IPaymentHistory];

  @ApiProperty({ example: 'PENDING' })
  @IsNotEmpty()
  @IsEnum(PAYMENT_STATUS)
  status: PAYMENT_STATUS;

  @ApiProperty({ example: 'This is payment note.' })
  @IsOptional()
  @IsString()
  note: string;
}
