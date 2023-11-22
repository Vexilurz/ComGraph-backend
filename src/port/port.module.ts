import { Module } from '@nestjs/common';
import { PortController } from './port.controller';
import { PortService } from './port.service';
import {LogModule} from "../log/log.module";

@Module({
  controllers: [PortController],
  providers: [PortService],
  exports: [PortService],
  imports: [
    LogModule
  ]
})
export class PortModule {}
