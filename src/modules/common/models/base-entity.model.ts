import { Types } from 'mongoose';

export interface IBaseEntity {
  _id: Types.ObjectId;
  createdOn: Date;
  updatedOn: Date;
  isDeleted: boolean;
}

export const BaseEntitySchemaContent = {
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  updatedOn: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
};
