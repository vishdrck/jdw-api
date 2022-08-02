import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IIntroVideos } from '../model/course.model';

export class CreateCourseDto {
  @ApiProperty({ example: 'Japan Language' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Description goes here' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 's3 image url goes here' })
  @IsString()
  @IsNotEmpty()
  bannerImage: string;

  @ApiProperty({ example: [{ name: 'demo', url: 'video url' }] })
  @IsArray()
  @IsNotEmpty()
  introVideos: IIntroVideos[];

  @ApiProperty({ example: 'courseType' })
  @IsString()
  @IsOptional()
  courseType?: string;

  @ApiProperty({ example: 'Note goes here' })
  @IsString()
  @IsOptional()
  note?: string;
}
