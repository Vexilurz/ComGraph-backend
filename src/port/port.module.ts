import { Module } from '@nestjs/common';
import { PortController } from './port.controller';
import { PortService } from './port.service';
import {DataModule} from "../data/data.module";
import {LogModule} from "../log/log.module";

@Module({
  controllers: [PortController],
  providers: [PortService],
  exports: [PortService],
  imports: [
    DataModule,
    LogModule
  ]
})
export class PortModule {}
