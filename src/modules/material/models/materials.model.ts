import { Document, PopulatedDoc, Schema, Types } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import {
  BaseEntitySchemaContent,
  IBaseEntity,
} from 'src/modules/common/models/base-entity.model';
import { IIntake } from 'src/modules/intake/model/intake.model';
import { FILE_TYPES } from '../constants/enum';

export interface IMaterial extends IBaseEntity {
  intakeId: PopulatedDoc<IIntake> | Types.ObjectId;
  title: string;
  url: string;
  type: FILE_TYPES;
  description?: string;
  note?: string;
}

export type IMaterialModel = IMaterial & Document;

export const schemaMaterial = new Schema<IMaterial>(
  {
    ...BaseEntitySchemaContent,
    intakeId: {
      type: Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.INTAKES,
    },
    type: {
      type: String,
      enum: FILE_TYPES,
    },
    url: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
  },
);
