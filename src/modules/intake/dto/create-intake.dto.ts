import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsBoolean, IsOptional } from 'class-validator';

export class CreateIntakeDto {
  @ApiProperty({ example: 'Japan Language' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '21/05/2022' })
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: '25/05/2022' })
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ example: 'http://google.com' })
  @IsString()
  @IsOptional()
  conferenceLink?: string;

  @ApiProperty({ example: 'Description goes here' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
