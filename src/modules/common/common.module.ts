import { Module } from '@nestjs/common';
import { CommonService } from './services/common.service';
import { CommonController } from './controllers/common.controller';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
