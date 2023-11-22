import { Injectable } from '@nestjs/common';
import {ProtocolSettingsDto} from "./dto/protocol-settings.dto";
import {PortService} from "../port/port.service";
import {LogService} from "../log/log.service";
import {waitUntil} from "../shared/lib/waitUntil";
import {SettingsService} from "./settings/settings.service";
import {ChannelService} from "../channel/channel.service";

@Injectable()
export class ProtocolService {
  constructor(
    private settingsService: SettingsService,
    private portService: PortService,
    private channelService: ChannelService,
    private logService: LogService
  ) {}

  private cycle = {enable: false}

  getStatus() {
    return {
      settings: this.settingsService.current,
      cycle: this.cycle.enable,
      sessionLength: this.channelService.getSessionLength()
    }
  }

  setSettings(dto: ProtocolSettingsDto) {
    const {newSession} = this.settingsService.set(dto)
    const {channelsTypes} = this.settingsService.current
    if (newSession) this.channelService.init(channelsTypes)
    return {...this.settingsService.current, newSession}
  }

  private async sendRequest() {
    const {command} = this.settingsService.current
    await this.portService.sendData([command])
  }

  async getOnce() {
    await this.oneRequest()
    const {responseValuesForEachChannel} = this.settingsService.current
    return this.channelService.getLastChannelPoints(responseValuesForEachChannel)
  }

  private async oneRequest() {
    this.portService.buffer = []
    const getLen = () => this.portService.buffer.length
    const {expectedLength, timeout, responseValuesForEachChannel} = this.settingsService.current

    await this.sendRequest()
    try {
      await waitUntil(
        () => getLen() >= expectedLength,
        timeout
      )
    } catch (e) {
      if (e.name == 'TimeoutError')
        throw new Error(`Timeout. Expected length ${expectedLength}, but received only ${getLen()}.`)
      else throw e
    }
    await this.channelService.parseData(this.portService.buffer, responseValuesForEachChannel)
    this.logService.log(`sessionLength: ${this.channelService.getSessionLength()}`)
  }

  async setCycleRequest(enable: boolean) {
    if (enable) { // start
      if (this.cycle.enable) throw new Error('Cycle request already started.')
      this.cycle.enable = true
      const errorsCount = this.logService.getErrorsCount()
      await this.cycleRequest(this.cycle)
      if (this.logService.getErrorsCount() > errorsCount) {
        this.cycle.enable = false
        throw new Error('There are some log occurred. See log for details...')
      }
    } else { // stop
      if (!this.cycle.enable) throw new Error('Cycle request not running.')
      this.cycle.enable = false
    }
  }

  private async cycleRequest({enable}) {
    if (!enable) return;
    try {
      await this.oneRequest()
    } catch (e) {
      this.logService.error(e.message)
    }
    try {
      const {cycleRequestFreq} = this.settingsService.current
      setTimeout(async () => await this.cycleRequest(this.cycle), cycleRequestFreq)
    } catch (e) {
      this.cycle.enable = false
      this.logService.error(e.message)
    }
  }
}
