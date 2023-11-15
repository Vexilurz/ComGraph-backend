import { Module } from '@nestjs/common';
import { PortController } from './port.controller';
import { PortService } from './port.service';
// import {FilesModule} from "../../files/files.module";

@Module({
  controllers: [PortController],
  providers: [PortService],
  // imports: [
  //   FilesModule
  // ]
})
export class PortModule {}
