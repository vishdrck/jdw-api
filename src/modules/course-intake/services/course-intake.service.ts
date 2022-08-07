import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { CommonService } from 'src/modules/common/services/common.service';
import {
  ICourseIntake,
  ICourseIntakeModel,
} from '../models/course-intake.model';

@Injectable()
export class CourseIntakeService
  extends CommonService<ICourseIntake>
  implements OnModuleInit
{
  constructor(
    @InjectModel(DB_COLLECTIONS.COURSE_INTAKES)
    courseIntakeModel: Model<ICourseIntakeModel>,
  ) {
    super(courseIntakeModel, DB_COLLECTIONS.COURSE_INTAKES);
  }
  onModuleInit() {
    return;
  }
}
