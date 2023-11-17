import { Module } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { ProtocolController } from './protocol.controller';
import {DataModule} from "../data/data.module";
import {PortModule} from "../port/port.module";
import {ErrorsModule} from "../errors/errors.module";

@Module({
  providers: [ProtocolService],
  controllers: [ProtocolController],
  exports: [ProtocolService],
  imports: [
    DataModule,
    PortModule,
    ErrorsModule
  ]
})
export class ProtocolModule {}
