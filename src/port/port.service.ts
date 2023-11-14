import { Injectable } from '@nestjs/common';
import {PortSettingsDto} from "./dto/port-settings.dto";

@Injectable()
export class PortService {
  async getExisting() {
    return ['COM1', 'COM2']
  }

  async connect(dto: PortSettingsDto) {
    // TODO: connect to port
    return `Connected to ${dto.name} ${dto.baudrate}`
  }

}
