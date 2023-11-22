import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import {NumbersModule} from "../../numbers/numbers.module";

@Module({
  providers: [SettingsService],
  exports: [SettingsService],
  imports: [
    NumbersModule
  ]
})
export class SettingsModule {}
