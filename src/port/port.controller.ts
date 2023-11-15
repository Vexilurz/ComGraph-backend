import {Body, Controller, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {PortService} from "./port.service";
import {PortSettingsDto} from "./dto/port-settings.dto";

@Controller('/port')
export class PortController {
  constructor(private portsService: PortService) {}

  @Get('/list')
  async getList() {
    try {
      const ports = await this.portsService.getList()
      return ports
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('/connect')
  async connect(@Body() portDTO: PortSettingsDto) {
    try {
      const res = await this.portsService.connect(portDTO)
      return res
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
