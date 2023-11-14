import {Controller, Get} from '@nestjs/common';
import {PortsService} from "./ports.service";

@Controller('/ports')
export class PortsController {
  constructor(private portsService: PortsService) {}

  @Get('/existing')
  getPorts() {
    return this.portsService.getExisting()
  }
}
