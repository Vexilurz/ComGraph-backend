import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import {PortModule} from "../port/port.module";
import {ProtocolModule} from "../protocol/protocol.module";
import {ErrorsModule} from "../errors/errors.module";

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports: [
    PortModule,
    ProtocolModule,
    ErrorsModule
  ]
})
export class StatusModule {}
