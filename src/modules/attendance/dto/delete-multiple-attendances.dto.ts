import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class DeleteMultipleAttendancesDTO {
  @ApiProperty({ example: '[ace5cewcc,56ecw5c4ew5ce]' })
  @IsArray()
  @IsNotEmpty()
  attendanceIds: string[];
}
