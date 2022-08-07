import { Module } from '@nestjs/common';
import { CourseIntakeController } from './controllers/course-intake.controller';
import { DB_COLLECTIONS } from '../common/constants/enums';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';
import { CourseIntakeService } from './services/course-intake.service';
import { CourseModule } from '../course/course.module';
import { IntakeModule } from '../intake/intake.module';

@Module({
  imports: [
    mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.COURSE_INTAKES]),
    CourseModule,
    IntakeModule,
  ],
  controllers: [CourseIntakeController],
  providers: [CourseIntakeService],
  exports: [CourseIntakeService],
})
export class CourseIntakeModule {}
