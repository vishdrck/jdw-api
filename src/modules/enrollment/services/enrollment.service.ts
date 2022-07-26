import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { CommonService } from 'src/modules/common/services/common.service';
import { IEnrollment, IEnrollmentModel } from '../models/enrollment.model';

@Injectable()
export class EnrollmentService extends CommonService<IEnrollment> {
  constructor(
    @InjectModel(DB_COLLECTIONS.ENROLLMENT)
    enrollmentModel: Model<IEnrollmentModel>,
  ) {
    super(enrollmentModel, DB_COLLECTIONS.ENROLLMENT);
  }
  onModuleInit() {
    return;
  }
}
