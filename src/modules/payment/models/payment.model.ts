import { Document, PopulatedDoc, Schema, Types } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import {
  BaseEntitySchemaContent,
  IBaseEntity,
} from 'src/modules/common/models/base-entity.model';
import { IEnrollment } from 'src/modules/enrollment/models/enrollment.model';
import { PAYMENT_STATUS, PAYMENT_TYPES } from '../constants/enum';

export interface IPaymentHistory {
  paidAmount: number;
  paidDate: Date;
}

export interface IPayment extends IBaseEntity {
  enrollmentId: PopulatedDoc<IEnrollment> | Types.ObjectId;
  dueDate?: Date;
  totalAmount?: number;
  paymentHistory?: IPaymentHistory[];
  paymentType: PAYMENT_TYPES;
  status: PAYMENT_STATUS;
  note?: string;
}

const schemaPaymentHistory = new Schema<IPaymentHistory>({
  paidAmount: Number,
  paidDate: Date,
});

export type IPaymentModel = IPayment & Document;

export const schemaIPayment = new Schema<IPayment>(
  {
    ...BaseEntitySchemaContent,
    enrollmentId: {
      type: Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.ENROLLMENT,
      required: true,
    },
    dueDate: {
      type: Date,
      required: false,
      default: new Date().getDate() + 14,
    },
    totalAmount: {
      type: Number,
      required: false,
      default: 0,
    },
    paymentType: {
      type: String,
      required: true,
      enum: PAYMENT_TYPES,
    },
    paymentHistory: {
      type: [schemaPaymentHistory],
      required: false,
      default: [],
    },
    status: {
      type: String,
      required: true,
      enum: PAYMENT_STATUS,
    },
    note: {
      type: String,
      required: false,
      default: '',
    },
  },
  {
    versionKey: false,
  },
);
