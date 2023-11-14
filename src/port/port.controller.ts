import {Body, Controller, Get, Post} from '@nestjs/common';
import {PortService} from "./port.service";
import {PortSettingsDto} from "./dto/port-settings.dto";

@Controller('/port')
export class PortController {
  constructor(private portsService: PortService) {}

  @Get('/existing')
  async getPorts() {
    const ports = await this.portsService.getExisting()
    return ports
  }

  @Post('/connect')
  async connect(@Body() portDTO: PortSettingsDto) {
    const res = await this.portsService.connect(portDTO)
    return res
  }
}
