import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import {ParserModule} from "../parser/parser.module";
import {NumbersModule} from "../numbers/numbers.module";
import { DataController } from './data.controller';
import {FilesModule} from "../files/files.module";

@Module({
  providers: [DataService],
  exports: [DataService],
  imports: [
    ParserModule,
    NumbersModule,
    FilesModule
  ],
  controllers: [DataController]
})
export class DataModule {}
