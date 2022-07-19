import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInstituteDto {
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
