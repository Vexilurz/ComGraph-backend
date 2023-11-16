import { Injectable } from '@nestjs/common';
import {PortService} from "../port/port.service";
import {ProtocolSettingsDto} from "./dto/protocol-settings.dto";

@Injectable()
export class ProtocolService {
  constructor(private portService: PortService) {}

  private settings: ProtocolSettingsDto
  private isGetOnce = false

  setSettings(dto: ProtocolSettingsDto) {
    if (!dto.command) throw new Error(`Command field is undefined`)
    if (typeof(dto.command) !== "number") throw new Error(`Command is NaN!`)
    this.settings = dto
    return this.settings
  }

  async getOnce() {
    this.isGetOnce = true
    return await this.portService.sendData([this.settings.command])
  }
}
