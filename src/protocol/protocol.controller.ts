import {Body, Controller, Get, HttpException, HttpStatus, Post, Query} from '@nestjs/common';
import {ProtocolService} from "./protocol.service";
import {ProtocolSettingsDto} from "./dto/protocol-settings.dto";

@Controller('/protocol')
export class ProtocolController {
  constructor(private protocolService: ProtocolService) {}

  @Post('/settings')
  settings(@Body() dto: ProtocolSettingsDto) {
    try {
      return this.protocolService.setSettings(dto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('/once')
  async getOnce() {
    try {
      return await this.protocolService.getOnce()
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/cycle?')
  async cycleRequest(@Query('enable') enable: string) {
    try {
      return await this.protocolService.setCycleRequest(enable === "true")
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
