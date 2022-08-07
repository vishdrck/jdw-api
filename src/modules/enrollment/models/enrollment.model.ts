import { Document, PopulatedDoc, Schema } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import {
  BaseEntitySchemaContent,
  IBaseEntity,
} from 'src/modules/common/models/base-entity.model';
import { ICourse } from 'src/modules/course/model/course.model';
import { IUser } from 'src/modules/users/models/user.model';

export interface IEnrollment extends IBaseEntity {
  userId: PopulatedDoc<IUser> | Schema.Types.ObjectId;
  courseId: PopulatedDoc<ICourse> | Schema.Types.ObjectId;
  enrolledDate: Date;
}

export type IEnrollmentModel = IEnrollment & Document;

export const schemaEnrollement = new Schema<IEnrollment>(
  {
    ...BaseEntitySchemaContent,
    userId: {
      type: Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.USERS,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.COURSES,
    },
    enrolledDate: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  },
);
