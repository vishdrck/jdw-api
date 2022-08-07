import { Module } from '@nestjs/common';
import { PaymentSlipService } from './services/payment-slip.service';
import { PaymentSlipController } from './controllers/payment-slip.controller';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';
import { DB_COLLECTIONS } from '../common/constants/enums';
import { PaymentModule } from '../payment/payment.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.PAYMENT_SLIPS]),
    PaymentModule,
    UsersModule,
  ],
  controllers: [PaymentSlipController],
  providers: [PaymentSlipService],
})
export class PaymentSlipModule {}
