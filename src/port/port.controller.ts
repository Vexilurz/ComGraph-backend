import {Body, Controller, Get, HttpException, HttpStatus, Post} from '@nestjs/common';
import {PortService} from "./port.service";
import {PortSettingsDto} from "./dto/port-settings.dto";

@Controller('/port')
export class PortController {
  constructor(private portsService: PortService) {}

  @Get('/list')
  async getList() {
    try {
      return await this.portsService.getList()
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('/connect')
  async connect(@Body() dto: PortSettingsDto) {
    try {
      await this.portsService.connect(dto)
      return `Connected to ${dto.path}`
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/disconnect')
  async disconnect() {
    try {
      await this.portsService.disconnect()
      return 'Disconnected.'
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
