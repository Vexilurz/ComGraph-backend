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

  getStatus() {
    const {settings} = this
    return {
      settings,
      cycle: this.cycle.enable,
      sessionLength: this.dataService.getSessionLength()
    }
  }

  setSettings(dto: ProtocolSettingsDto) {
    const {newSession} = this.settings.set(dto)
    const {channelsTypes} = this.settings
    if (newSession) this.dataService.initChannels(channelsTypes)
    return {...this.settings, newSession}
  }

  async getOnce() {
    console.log(await this.oneRequest())
    return this.dataService.getLastChannelPoints(this.settings.responseValuesForEachChannel)
  }

  private async sendRequest() {
    const {command} = this.settings
    await this.portService.sendData([command])
  }

  private async oneRequest() {
    this.dataService.buffer = []
    const getLen = () => this.dataService.buffer.length
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
      else throw e
    }
    await this.dataService.parseData(this.settings.responseValuesForEachChannel)

    return {sessionLength: this.dataService.getSessionLength()}
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
