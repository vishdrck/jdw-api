import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { Types } from 'mongoose';
import { PAYMENT_TYPES } from 'src/modules/payment/constants/enum';

export class CreatePaymentSlipResponseDto {
  @ApiProperty({ example: '62df343d323232' })
  @IsMongoId()
  @IsNotEmpty()
  enrollmentId: Types.ObjectId;

  @ApiProperty({ example: 'https://example.com/slip' })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  slipURL: string;

  @ApiProperty({ example: 3000 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: '01/05/2022 12:15PM' })
  @IsDate()
  @IsNotEmpty()
  paidDate: Date;

  @ApiProperty({ example: 'REGISTRATION_FEE' })
  @IsNotEmpty()
  @IsEnum(PAYMENT_TYPES)
  paymentType: PAYMENT_TYPES;

  @ApiProperty({ example: '56d4f34f5sfv' })
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;
}
