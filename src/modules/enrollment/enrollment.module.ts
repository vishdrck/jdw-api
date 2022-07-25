import { Module } from '@nestjs/common';
import { DB_COLLECTIONS } from '../common/constants/enums';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';

@Module({
  imports: [mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.ENROLLEMENT])],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
