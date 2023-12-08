import {Controller, Get, HttpException, HttpStatus, Query} from '@nestjs/common';
import {DataService} from "./data.service";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Data')
@Controller('data')
export class DataController {
  constructor(private dataService: DataService) {}

  @ApiOperation({summary: 'Get session data'})
  @ApiResponse({status: 200, type: [Array<number>]})
  @ApiQuery({name: 'start', type: Number, example: 0,
    description: 'Start index of session data array', required: false})
  @ApiQuery({name: 'end', type: Number, example: 1,
    description: 'End index of session data array', required: false})
  @Get('/points?')
  getData(
    @Query('start') start?: number,
    @Query('end') end?: number
  ) {
    try {
      return this.dataService.getChannelPoints(start, end)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiOperation({summary: 'Save session data to file'})
  @ApiResponse({status: 200, type: String})
  @Get('/save')
  saveData() {
    try {
      return this.dataService.saveSession()
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
