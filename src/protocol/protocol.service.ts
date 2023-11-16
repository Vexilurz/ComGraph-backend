import { Injectable } from '@nestjs/common';
import {ProtocolSettingsDto} from "./dto/protocol-settings.dto";
import {DataService} from "../data/data.service";
import {PortService} from "../port/port.service";
import {waitUntil} from "../shared/lib/waitUntil";

@Injectable()
export class ProtocolService {
  constructor(
    private dataService: DataService,
    private portService: PortService
  ) {}

  private settings: ProtocolSettingsDto
  private expectedLength: number
  private isGetOnce = false

  setSettings(dto: ProtocolSettingsDto) {
    if (!dto.command) throw new Error(`Command field is undefined`)
    if (typeof(dto.command) !== "number") throw new Error(`Command is NaN!`)
    this.settings = dto
    this.expectedLength = this.settings.expectedLength // TODO: calculate this!
    return this.settings
  }

  async getOnce() {
    this.isGetOnce = true
    this.dataService.dataBuffer = []
    await this.portService.sendData([this.settings.command]) // Request sent...
    try {
      await waitUntil(
        () => this.dataService.dataBuffer.length >= this.expectedLength,
        this.settings.timeout
      )
    } catch (e) {
      throw new Error(`Request timeout. Expected buffer length: ${this.expectedLength}, current buffer length: ${this.dataService.dataBuffer.length}.`)
    }
    return {
      data: this.dataService.dataBuffer.splice(0, this.expectedLength),
      extraBytesInBuffer: this.dataService.dataBuffer.length
    }
  }
}
