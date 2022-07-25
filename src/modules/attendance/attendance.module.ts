import { Module } from '@nestjs/common';
import { DB_COLLECTIONS } from '../common/constants/enums';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';
import { AttendanceController } from './controllers/attendance.controller';
import { AttendanceService } from './services/attendance.service';

@Module({
  imports: [mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.ATTENDANCE])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
