import { Module } from '@nestjs/common';
import { CommonController } from './controllers/common.controller';

@Module({
  controllers: [CommonController],
  providers: [],
})
export class CommonModule {}
