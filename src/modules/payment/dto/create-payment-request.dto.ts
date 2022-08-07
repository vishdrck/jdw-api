import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { PAYMENT_STATUS, PAYMENT_TYPES } from '../constants/enum';
import { IPaymentHistory } from '../models/payment.model';

export class CreatePaymentRequestDto {
  @ApiProperty({ example: '62df343d323232' })
  @IsMongoId()
  @IsNotEmpty()
  enrollmentId: Types.ObjectId;

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
