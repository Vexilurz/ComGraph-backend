import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import {FilesModule} from "../files/files.module";

@Module({
  providers: [DataService],
  exports: [DataService],
  imports: [
    FilesModule
  ]
})
export class DataModule {}
