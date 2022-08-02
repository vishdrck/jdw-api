import { BaseEntitySchemaContent, IBaseEntity } from 'src/modules/common/models/base-entity.model';
import { Document, Schema } from 'mongoose';

export interface IInstitute extends IBaseEntity {
  name: string;
  description?: string;
  logo?: string;
  address?: string;
  banner?: string;
  contact?: string;
  type?: string;
  note?: string;
  isRegistrationFee?: boolean;
}

export type IInstituteModel = IInstitute & Document;

export const schemaInstitute = new Schema<IInstituteModel>(
  {
    ...BaseEntitySchemaContent,
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    banner: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    isRegistrationFee: {
      type: Boolean,
      required: false,
      defualt: false,
    },
  },
  {
    versionKey: false,
  },
);
