import { Module } from '@nestjs/common';
import { PortController } from './port.controller';
import { PortService } from './port.service';
import {DataModule} from "../data/data.module";
import {ErrorsModule} from "../errors/errors.module";

@Module({
  controllers: [PortController],
  providers: [PortService],
  exports: [PortService],
  imports: [
    DataModule,
    ErrorsModule
  ]
})
export class PortModule {}
