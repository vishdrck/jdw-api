import { Module } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CourseController } from './controllers/course.controller';
import { DB_COLLECTIONS } from '../common/constants/enums';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';

@Module({
  imports: [mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.COURSES])],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
