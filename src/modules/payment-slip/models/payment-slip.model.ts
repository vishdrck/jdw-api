import { Document, PopulatedDoc, Schema, Types } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import {
  BaseEntitySchemaContent,
  IBaseEntity,
} from 'src/modules/common/models/base-entity.model';
import { IEnrollment } from 'src/modules/enrollment/models/enrollment.model';
import { PAYMENT_TYPES } from 'src/modules/payment/constants/enum';
import { IUser } from 'src/modules/users/models/user.model';

export interface IPaymentSlip extends IBaseEntity {
  enrollmentId?: PopulatedDoc<IEnrollment> | Types.ObjectId;
  slipURL: string;
  amount: number;
  paidDate: Date;
  paymentType: PAYMENT_TYPES;
  userId: PopulatedDoc<IUser> | Schema.Types.ObjectId;
}

export type IPaymentSlipModel = IPaymentSlip & Document;

export const schemaIPaymentSlip = new Schema<IPaymentSlip>(
  {
    ...BaseEntitySchemaContent,
    enrollmentId: {
      type: Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.ENROLLMENT,
      required: false,
    },
    slipURL: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paidDate: {
      type: Date,
      required: true,
    },
    paymentType: {
      type: String,
      enum: PAYMENT_TYPES,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.USERS,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);
