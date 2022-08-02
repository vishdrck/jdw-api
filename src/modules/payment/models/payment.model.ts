import { Document, PopulatedDoc, Schema, Types } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { BaseEntitySchemaContent, IBaseEntity } from 'src/modules/common/models/base-entity.model';
import { IEnrollment } from 'src/modules/enrollment/models/enrollment.model';
import { PAYMENT_STATUS, PAYMENT_TYPES } from '../constants/enum';

export interface IPayment extends IBaseEntity {
  enrollementId: PopulatedDoc<IEnrollment> | Types.ObjectId;
  dueDate: Date;
  totalAmount: number;
  paidAmount: number;
  paymentType: PAYMENT_TYPES;
  status: PAYMENT_STATUS;
  note: string;
}

export type IPaymentModel = IPayment & Document;

export const schemaIPayment = new Schema<IPayment>(
  {
    ...BaseEntitySchemaContent,
    enrollementId: {
      type: Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.ENROLLMENT,
    },
    dueDate: {
      type: Date,
      default: new Date(),
    },
    paymentType: {
      type: String,
      enum: PAYMENT_TYPES,
    },
    paidAmount: {
      type: Number,
    },
  },
  {
    versionKey: false,
  },
);
