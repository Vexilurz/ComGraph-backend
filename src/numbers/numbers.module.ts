import { Module } from '@nestjs/common';
import { NumbersService } from './numbers.service';
import { NumbersController } from './numbers.controller';

@Module({
  providers: [NumbersService],
  exports: [NumbersService],
  controllers: [NumbersController]
})
export class NumbersModule {}
