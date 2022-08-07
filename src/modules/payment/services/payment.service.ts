import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { CommonService } from 'src/modules/common/services/common.service';
import { IPayment, IPaymentModel } from '../models/payment.model';

@Injectable()
export class PaymentService extends CommonService<IPayment> {
  constructor(
    @InjectModel(DB_COLLECTIONS.PAYMENTS)
    paymentModel: Model<IPaymentModel>,
  ) {
    super(paymentModel, DB_COLLECTIONS.PAYMENTS);
  }
}
