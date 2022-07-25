import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class DeleteMultipleMaterialsDTO {
  @ApiProperty({ example: '[ace5cewcc,56ecw5c4ew5ce]' })
  @IsArray()
  @IsNotEmpty()
  materialIds: string[];
}
