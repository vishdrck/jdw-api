import { Document, PopulatedDoc, Schema, Types } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import {
  BaseEntitySchemaContent,
  IBaseEntity,
} from 'src/modules/common/models/base-entity.model';
import { ICourse } from 'src/modules/course/model/course.model';
import { IIntake } from 'src/modules/intake/model/intake.model';

export interface ICourseIntake extends IBaseEntity {
  courseId: PopulatedDoc<ICourse> | Schema.Types.ObjectId;
  intakeId: PopulatedDoc<IIntake> | Schema.Types.ObjectId;
  registrationPayment?: number;
  coursePayment?: number;
}

export type ICourseIntakeModel = ICourseIntake & Document;

export const schemaCourseIntake = new Schema<ICourseIntake>(
  {
    ...BaseEntitySchemaContent,
    courseId: {
      type: Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.COURSES,
    },
    intakeId: {
      type: Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.INTAKES,
    },
    coursePayment: {
      type: Number,
      required: false,
    },
    registrationPayment: {
      type: Number,
      required: false,
    },
  },
  {
    versionKey: false,
  },
);
