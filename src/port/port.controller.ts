import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PortService} from "./port.service";
import {PortSettingsDto} from "./dto/port-settings.dto";

@Controller('/port')
export class PortController {
  constructor(private portsService: PortService) {}

  @Get('/existing')
  async getExisting() {
    const ports = await this.portsService.getExisting()
    return ports
  }

  @Get('/:name')
  async getPort(@Param('name') name: string) {
    const port = await this.portsService.getPort(name)
    return port
  }

  @Post('/connect')
  async connect(@Body() portDTO: PortSettingsDto) {
    const res = await this.portsService.connect(portDTO)
    return res
  }
}
