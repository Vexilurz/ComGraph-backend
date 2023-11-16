import { Module } from '@nestjs/common';
import { PortController } from './port.controller';
import { PortService } from './port.service';
import {DataModule} from "../data/data.module";

@Module({
  controllers: [PortController],
  providers: [PortService],
  exports: [PortService],
  imports: [
    DataModule
  ]
})
export class PortModule {}
