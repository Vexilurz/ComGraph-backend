import { Module } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { ProtocolController } from './protocol.controller';
import {PortModule} from "../port/port.module";

@Module({
  providers: [ProtocolService],
  controllers: [ProtocolController],
  imports: [
    PortModule
  ]
})
export class ProtocolModule {}
