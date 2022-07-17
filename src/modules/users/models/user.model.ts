import { BaseEntitySchemaContent, IBaseEntity } from 'src/modules/common/models/base-entity.model';
import { ACCOUNT_STATES, USER_TYPES, GENDER_TYPES } from '../constants/enums';
import { Document, Schema } from 'mongoose';

export interface IUser extends IBaseEntity {
  firstName: string;
  lastName?: string;
  email: string;
  contactNo?: string;
  nic?: string;
  gender: GENDER_TYPES;
  address?: string;
  userType: USER_TYPES;
  accountStatus: ACCOUNT_STATES;
}

export type IUserModel = IUser & Document;

export const schemaUser = new Schema<IUserModel>({
  ...BaseEntitySchemaContent,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
    enum: GENDER_TYPES,
  },
  userType: {
    type: String,
    enum: USER_TYPES,
  },
  accountStatus: {
    type: String,
    default: ACCOUNT_STATES.NEW,
    enum: ACCOUNT_STATES,
  },
});
