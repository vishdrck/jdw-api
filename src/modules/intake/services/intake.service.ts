import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { CommonService } from 'src/modules/common/services/common.service';
import { CreateIntakeDto } from '../dto/create-intake.dto';
import { UpdateIntakeDto } from '../dto/update-intake.dto';
import { IIntake, IIntakeModel } from '../model/intake.model';

@Injectable()
export class IntakeService
  extends CommonService<IIntake>
  implements OnModuleInit
{
  constructor(
    @InjectModel(DB_COLLECTIONS.INTAKES)
    intakeModel: Model<IIntakeModel>,
  ) {
    super(intakeModel, DB_COLLECTIONS.INTAKES);
  }

  async onModuleInit() {
    return;
  }
}
