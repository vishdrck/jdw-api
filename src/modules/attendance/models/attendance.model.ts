import { Document, PopulatedDoc, Schema } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { BaseEntitySchemaContent, IBaseEntity } from 'src/modules/common/models/base-entity.model';
import { IEnrollment } from 'src/modules/enrollment/models/enrollment.model';

export interface IAttendance extends IBaseEntity {
  enrollmentId: PopulatedDoc<IEnrollment> | Schema.Types.ObjectId;
  clockInDateTime: Date;
}

export type IAttendanceModel = IAttendance & Document;

export const schemaAttendance = new Schema<IAttendance>({
  ...BaseEntitySchemaContent,
  enrollmentId: {
    type: Schema.Types.ObjectId,
    ref: DB_COLLECTIONS.ENROLLEMENT,
  },
  clockInDateTime: {
    type: Date,
    default: new Date(),
  },
});
