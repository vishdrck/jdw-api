import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { CommonService } from 'src/modules/common/services/common.service';
import { IPaymentSlip, IPaymentSlipModel } from '../models/payment-slip.model';

@Injectable()
export class PaymentSlipService extends CommonService<IPaymentSlip> {
  constructor(
    @InjectModel(DB_COLLECTIONS.PAYMENT_SLIPS)
    paymentSlipModel: Model<IPaymentSlipModel>,
  ) {
    super(paymentSlipModel, DB_COLLECTIONS.PAYMENT_SLIPS);
  }
}
