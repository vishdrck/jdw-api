import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { CommonService } from 'src/modules/common/services/common.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { ICourse, ICourseModel } from '../model/course.model';

@Injectable()
export class CourseService
  extends CommonService<ICourse>
  implements OnModuleInit
{
  constructor(
    @InjectModel(DB_COLLECTIONS.COURSES)
    courseModel: Model<ICourseModel>,
  ) {
    super(courseModel, DB_COLLECTIONS.COURSES);
  }

  async onModuleInit() {
    return;
  }
}
