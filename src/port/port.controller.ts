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
  connect(@Body() dto: PortSettingsDto) {
    try {
      this.portsService.connect(dto)
      return `Trying to connect to ${dto.path} every 1000ms...`
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/disconnect')
  disconnect() {
    try {
      this.portsService.disconnect()
      return 'Disconnected.'
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/raw')
  getRaw() {
    return this.portsService.getRaw()
  }
}
