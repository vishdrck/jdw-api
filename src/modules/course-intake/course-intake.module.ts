import { Module } from '@nestjs/common';
import { CourseIntakeController } from './controllers/course-intake.controller';
import { DB_COLLECTIONS } from '../common/constants/enums';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';
import { CourseIntakeService } from './services/course-intake.service';

@Module({
  imports: [mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.COURSE_INTAKES])],
  controllers: [CourseIntakeController],
  providers: [CourseIntakeService],
})
export class CourseIntakeModule {}
