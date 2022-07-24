import { Document, Schema } from 'mongoose';
import { BaseEntitySchemaContent, IBaseEntity } from 'src/modules/common/models/base-entity.model';

export interface IIntake extends IBaseEntity {
  name: string;
  startDate: Date;
  endDate: Date;
  conferenceLink?: string;
  description?: string;
  isActive: boolean;
}

export type IIntakeModel = IIntake & Document;

export const schemaIntake = new Schema<IIntakeModel>({
  ...BaseEntitySchemaContent,
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  conferenceLink: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: false,
    default: false,
  },
});
