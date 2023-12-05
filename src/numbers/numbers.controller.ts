import {Controller, Get} from '@nestjs/common';
import {NumbersService, NumberType} from "./numbers.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Number types')
@Controller('/numbers')
export class NumbersController {
  constructor(private numbersService: NumbersService) {}

  @ApiOperation({summary: 'Get a list of supported channel types'})
  @ApiResponse({status: 200, type: [NumberType]})
  @Get('/supported')
  getSupported() {
    return this.numbersService.getSupported()
  }
}
