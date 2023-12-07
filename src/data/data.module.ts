import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import {ParserModule} from "../parser/parser.module";
import {NumbersModule} from "../numbers/numbers.module";
import { DataController } from './data.controller';

@Module({
  providers: [DataService],
  exports: [DataService],
  imports: [
    ParserModule,
    NumbersModule,
  ],
  controllers: [DataController]
})
export class DataModule {}
