import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import {ParserModule} from "../parser/parser.module";
import {NumbersModule} from "../numbers/numbers.module";

@Module({
  providers: [ChannelService],
  exports: [ChannelService],
  imports: [
    ParserModule,
    NumbersModule,
  ]
})
export class ChannelModule {}
