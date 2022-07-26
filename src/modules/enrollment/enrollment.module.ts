import { forwardRef, Module } from '@nestjs/common';
import { DB_COLLECTIONS } from '../common/constants/enums';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';
import { CourseModule } from '../course/course.module';
import { UsersModule } from '../users/users.module';
import { EnrollmentController } from './controllers/enrollment.controller';
import { EnrollmentService } from './services/enrollment.service';

@Module({
  imports: [mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.ENROLLMENT]), UsersModule, CourseModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
