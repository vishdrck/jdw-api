import { Module } from '@nestjs/common';
import { MaterialController } from './controllers/material.controller';
import { MaterialService } from './services/material.service';

@Module({
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
