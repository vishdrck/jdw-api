import { Global, Module } from '@nestjs/common';
import { CommonController } from './controllers/common.controller';
import { CommonService } from './services/common.service';
import { EmailService } from './services/email.service';

@Global()
@Module({
  imports: [],
  controllers: [CommonController],
  providers: [EmailService],
  exports: [EmailService],
})
export class CommonModule {}
