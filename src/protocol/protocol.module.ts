import { Module } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { ProtocolController } from './protocol.controller';
import {DataModule} from "../data/data.module";
import {PortModule} from "../port/port.module";
import {LogModule} from "../log/log.module";

@Module({
  providers: [ProtocolService],
  controllers: [ProtocolController],
  exports: [ProtocolService],
  imports: [
    DataModule,
    PortModule,
    LogModule
  ]
})
export class ProtocolModule {}
