import { Module } from '@nestjs/common';
import { NumbersService } from './numbers.service';

@Module({
  providers: [NumbersService],
  exports: [NumbersService]
})
export class NumbersModule {}
