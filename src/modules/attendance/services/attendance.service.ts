import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { CommonService } from 'src/modules/common/services/common.service';
import { IAttendance } from '../models/attendance.model';

@Injectable()
export class AttendanceService extends CommonService<IAttendance> {
  constructor(
    @InjectModel(DB_COLLECTIONS.ATTENDANCE)
    attendanceModel: Model<IAttendance>,
  ) {
    super(attendanceModel, DB_COLLECTIONS.ATTENDANCE);
  }
  onModuleInit() {
    return;
  }
}
