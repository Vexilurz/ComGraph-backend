import { Injectable } from '@nestjs/common';
import {ProtocolSettingsDto} from "./dto/protocol-settings.dto";
import {DataService} from "../data/data.service";
import {PortService} from "../port/port.service";
import {ErrorsService} from "../errors/errors.service";
import {waitUntil} from "../shared/lib/waitUntil";
import {ProtocolSettings} from "./ProtocolSettings";

@Injectable()
export class ProtocolService {
  constructor(
    private dataService: DataService,
    private portService: PortService,
    private errorsService: ErrorsService
  ) {}

  private settings: ProtocolSettings = new ProtocolSettings()
  private cycle = {enable: false}

  private addError(message: string) {
    this.errorsService.addError('Protocol: '+message)
  }

  private getDataBufferLen = () => this.dataService.dataBuffer.length

  getStatus() {
    const {settings} = this
    return {
      settings,
      cycle: this.cycle.enable,
      session: this.dataService.getInfo()
    }
  }

  setSettings(dto: ProtocolSettingsDto) {
    const {newSession} = this.settings.set(dto)
    const {channelsTypes} = this.settings
    if (newSession) this.dataService.initChannels(channelsTypes)
    return {...this.settings, newSession}
  }

  async getOnce() {
    this.dataService.dataBuffer = []
    console.log(await this.oneRequest())
    const {responseValuesForEachChannel} = this.settings
    const data = this.dataService.getLastChannelPoints(responseValuesForEachChannel)
    return {
      data,
      isErrors: this.errorsService.isErrorsExists(),
      status: this.getStatus()
    }
  }

  private async sendRequest() {
    const {command} = this.settings
    await this.portService.sendData([command])
  }

  private async oneRequest() {
    const prevLength = this.getDataBufferLen();
    const getLen = () => this.getDataBufferLen() - prevLength
    const {expectedLength, timeout} = this.settings
    try {
      await this.sendRequest()
      await waitUntil(
        () => getLen() >= expectedLength,
        timeout
      )
    } catch (e) {
      if (e.name == 'TimeoutError')
        throw new Error(`Timeout. Expected length ${expectedLength}, but received only ${getLen()}.`)
      else
        throw new Error(`Init settings first! ${e.message}`)
    }
    const res = {
      receivedLength: getLen(),
      prevLength,
      currentLength: this.getDataBufferLen()
    }
    const data = this.dataService.dataBuffer.splice(0, expectedLength)
    await this.dataService.parseData(data)
    return res
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
      const {cycleRequestFreq} = this.settings
      setTimeout(async () => await this.cycleRequest(this.cycle), cycleRequestFreq)
    } catch (e) {
      this.cycle.enable = false
      this.addError(e.message)
    }
  }
}
