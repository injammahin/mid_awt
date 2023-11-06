import { Module } from '@nestjs/common';
import { ManageCController } from './manage-c.controller';
import { ManageCService } from './manage-c.service';

@Module({
  controllers: [ManageCController],
  providers: [ManageCService]
})
export class ManageCModule {}
