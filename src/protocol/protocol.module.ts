import { Module } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { ProtocolController } from './protocol.controller';
import {PortModule} from "../port/port.module";
import {LogModule} from "../log/log.module";
import { SettingsModule } from './settings/settings.module';
import {ChannelModule} from "../channel/channel.module";

@Module({
  providers: [ProtocolService],
  controllers: [ProtocolController],
  exports: [ProtocolService],
  imports: [
    SettingsModule,
    PortModule,
    ChannelModule,
    LogModule,
  ]
})
export class ProtocolModule {}
