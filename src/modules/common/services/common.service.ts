import { Injectable } from '@nestjs/common';
import { Model, Document, FilterQuery, QueryOptions, Types } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { IBaseEntity } from '../models/base-entity.model';

@Injectable()
export abstract class CommonService<T extends IBaseEntity> {
  constructor(private mongooseModel: Model<T & Document>, private model: DB_COLLECTIONS) {}

  async addDocument(doc: T, populate: string[] = []): Promise<T> {
    const newDoc = await this.mongooseModel.create(doc);
    newDoc.populate(populate);
    return newDoc.toObject() as T;
  }

  getModel() {
    return this.mongooseModel;
  }

  async updateDocument(doc: T, populate: string[] = [], filter: FilterQuery<T> = { _id: doc._id }): Promise<T> {
    const newDoc: T = {
      ...doc,
      updatedOn: new Date(),
    };

    return (await this.mongooseModel.findOneAndUpdate(filter, newDoc, { new: true, populate }).exec())?.toObject() as T;
  }

  async filterDocuments(filter: FilterQuery<T> = {}, options: QueryOptions = {}): Promise<T[]> {
    return await this.mongooseModel.find(filter, {}, options).exec();
  }

  async findDocument(filter: FilterQuery<T> = {}, options: QueryOptions = {}): Promise<T | null> {
    return (await this.mongooseModel.findOne(filter, {}, options)?.exec())?.toObject() as T | null;
  }

  async findById(id: string | Types.ObjectId): Promise<T | null> {
    return (await this.mongooseModel.findById(id)?.exec())?.toObject() as T | null;
  }

  // use only for roleback purposes
  async findAndHardDelete(id: string | Types.ObjectId): Promise<T | null> {
    return (await this.mongooseModel.findByIdAndDelete(id)?.exec())?.toObject() as T | null;
  }
}
