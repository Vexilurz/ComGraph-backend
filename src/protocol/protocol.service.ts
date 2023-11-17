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
  private cycle = {enable: false}

  setSettings(dto: ProtocolSettingsDto) {
    if (!dto.command) throw new Error(`Command field is undefined`)
    if (typeof(dto.command) !== "number") throw new Error(`Command is NaN!`)
    this.settings = dto
    this.expectedLength = this.settings.expectedLength // TODO: calculate this!
    return this.settings
  }

  private async sendRequest() {
    await this.portService.sendData([this.settings.command])
  }

  private async oneRequest() {
    const prevLength = this.dataService.dataBuffer.length;
    const getLen = () => {return this.dataService.dataBuffer.length - prevLength}
    await this.sendRequest() // TODO: catch error when settings not initialized
    try {
      await waitUntil(
        () => getLen() >= this.expectedLength,
        this.settings.timeout
      )
    } catch (e) {
      const len = getLen()
      this.dataService.dataBuffer.splice(-len)
      throw new Error(`Request timeout. Expected length ${this.expectedLength}, but received only ${len}.`)
    }
    return {
      received: getLen(),
      prevLength,
      currentLength: this.dataService.dataBuffer.length
    }
  }

  async getOnce() {
    this.dataService.dataBuffer = []
    await this.oneRequest()
    const data = this.dataService.dataBuffer.splice(0, this.expectedLength)
    return {
      data,
      bufferLength: this.dataService.dataBuffer.length
    }
  }

  setCycleRequest(enable: boolean) {
    this.cycle.enable = enable
    if (enable) this.cycleRequest(this.cycle)
    return this.cycle.enable
  }

  private async cycleRequest({enable}) {
    if (!enable) return;
    console.log(await this.oneRequest())
    setTimeout(async () => await this.cycleRequest(this.cycle), this.settings.cycleRequestFreq)
  }
}
