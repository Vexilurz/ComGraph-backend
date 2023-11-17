import { Injectable } from '@nestjs/common';
import {ProtocolSettingsDto} from "./dto/protocol-settings.dto";
import {DataService} from "../data/data.service";
import {PortService} from "../port/port.service";
import {ErrorsService} from "../errors/errors.service";
import {waitUntil} from "../shared/lib/waitUntil";

@Injectable()
export class ProtocolService {
  constructor(
    private dataService: DataService,
    private portService: PortService,
    private errorsService: ErrorsService
  ) {}

  private settings: ProtocolSettingsDto
  private expectedLength: number
  private cycle = {enable: false}

  private addError(message: string) {
    this.errorsService.addError('Protocol: '+message)
  }

  private getDataBufferLen = () => this.dataService.dataBuffer.length

  getStatus() {
    return {
      cycle: this.cycle.enable,
      bufferLength: this.getDataBufferLen(),
      settings: this.settings
    }
  }

  setSettings(dto: ProtocolSettingsDto) {
    this.settings = dto
    this.expectedLength = this.settings.expectedLength // TODO: calculate this!
    return this.getStatus()
  }

  async getOnce() {
    this.dataService.dataBuffer = []
    console.log(await this.oneRequest())
    const data = this.dataService.dataBuffer.splice(0, this.expectedLength)
    return {
      data, // TODO: replace to parsed channels data
      isErrors: this.errorsService.isErrorsExists(),
      status: this.getStatus()
    }
  }

  private async sendRequest() {
    await this.portService.sendData([this.settings.command])
  }

  private async oneRequest() {
    const prevLength = this.getDataBufferLen();
    const getLen = () => this.getDataBufferLen() - prevLength
    await this.sendRequest()
    try {
      await waitUntil(
        () => getLen() >= this.expectedLength,
        this.settings.timeout
      )
    } catch (e) {
      if (e.name == 'TimeoutError')
        this.addError(`Timeout. Expected length ${this.expectedLength}, but received only ${getLen()}.`)
      else
        throw e
    }
    return {
      receivedLength: getLen(),
      prevLength,
      currentLength: this.getDataBufferLen()
    }
  }

  async setCycleRequest(enable: boolean) {
    this.cycle.enable = enable
    if (enable) await this.cycleRequest(this.cycle)
    return {
      isErrors: this.errorsService.isErrorsExists(),
      status: this.getStatus()
    }
  }

  private async cycleRequest({enable}) {
    if (!enable) return;
    try {
      console.log(await this.oneRequest())
    } catch (e) {
      this.addError(e.message)
    }
    try {
      setTimeout(async () => await this.cycleRequest(this.cycle), this.settings.cycleRequestFreq)
    } catch (e) {
      this.cycle.enable = false
      this.addError(e.message)
    }
  }
}
