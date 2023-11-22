import {Controller, Get} from '@nestjs/common';
import {NumbersService} from "./numbers.service";

@Controller('/numbers')
export class NumbersController {
  constructor(private numbersService: NumbersService) {}

  @Get('/supported')
  getSupported() {
    return this.numbersService.getSupported()
  }
}
