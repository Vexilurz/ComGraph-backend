import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import {PortModule} from "../port/port.module";
import {ProtocolModule} from "../protocol/protocol.module";
import {LogModule} from "../log/log.module";

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports: [
    PortModule,
    ProtocolModule,
    LogModule
  ]
})
export class StatusModule {}
