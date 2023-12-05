import {Body, Controller, Get, HttpException, HttpStatus, Post, Query} from '@nestjs/common';
import {ProtocolService} from "./protocol.service";
import {ProtocolSettingsDto} from "./dto/protocol-settings.dto";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Protocol')
@Controller('/protocol')
export class ProtocolController {
  constructor(private protocolService: ProtocolService) {}

  @ApiOperation({summary: 'Set protocol settings'})
  @ApiResponse({status: 200, type: ProtocolSettingsDto})
  @Post('/settings')
  settings(@Body() dto: ProtocolSettingsDto) {
    try {
      return this.protocolService.setSettings(dto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  @ApiOperation({summary: 'Send command and wait for response once time'})
  @ApiResponse({status: 200, type: [Array<number>]})
  @Get('/once')
  async getOnce() {
    try {
      return await this.protocolService.getOnce()
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiOperation({summary: 'Start or stop cycle request'})
  @ApiResponse({status: 200, type: String})
  @ApiQuery({name: 'enable', type: Boolean, example: 'true | false',
    description: 'Enable or disable cycle request'})
  @Post('/cycle?')
  async cycleRequest(@Query('enable') enable: string) {
    const en = enable === 'true'
    try {
      await this.protocolService.setCycleRequest(en)
      return `Cycle request ${en ? 'started' : 'stopped'}.`
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiOperation({summary: 'Get session data'})
  @ApiResponse({status: 200, type: [Array<number>]})
  @ApiQuery({name: 'start', type: Number, example: 0,
    description: 'Start index of session data array'})
  @ApiQuery({name: 'end', type: Number, example: 1,
    description: 'End index of session data array'})
  @Get('/data?')
  getData(
    @Query('start') start?: number,
    @Query('end') end?: number
  ) {
    try {
      return this.protocolService.getData(start, end)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
