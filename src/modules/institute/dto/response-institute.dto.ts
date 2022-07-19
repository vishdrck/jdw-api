import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ResponseInstituteDto {
  @ApiProperty({ example: 'd343fwec32ft45223' })
  @IsMongoId()
  @IsNotEmpty()
  _id: Types.ObjectId;

  @ApiProperty({ example: 'JDW Institute' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Institute example goes here' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 'Base64 image' })
  @IsString()
  @IsOptional()
  logo: string;

  @ApiProperty({ example: 'Colombo' })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ example: 'Base64 image' })
  @IsString()
  @IsOptional()
  banner: string;

  @ApiProperty({ example: '0711234567', description: 'Contact number' })
  @IsString()
  @IsOptional()
  contact: string;

  @ApiProperty({ example: 'Institute type' })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({ example: 'Small note goes here' })
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty({ example: 'isRegistration: false' })
  @IsString()
  @IsOptional()
  isRegistrationFee: boolean;
}
