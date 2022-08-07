import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';
import { DB_COLLECTIONS } from '../common/constants/enums';
import { EnrollmentModule } from '../enrollment/enrollment.module';
import { InstituteModule } from '../institute/institute.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.PAYMENTS]),
    EnrollmentModule,
    InstituteModule,
    CourseModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
