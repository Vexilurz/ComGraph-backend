import { Module } from '@nestjs/common';
import { ParserService } from './parser.service';
import {NumbersModule} from "../numbers/numbers.module";

@Module({
  providers: [ParserService],
  exports: [ParserService],
  imports: [
    NumbersModule
  ]
})
export class ParserModule {}
