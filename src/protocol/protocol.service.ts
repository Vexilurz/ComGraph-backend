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

  private _cycle = {enable: false}

  getStatus() {
    return {
      settings: this.settingsService.current,
      cycle: this._cycle.enable,
      sessionLength: this.channelService.getSessionLength()
    }
  }

  setSettings(dto: ProtocolSettingsDto) {
    const {newSession} = this.settingsService.set(dto)
    const {channelsTypes} = this.settingsService.current
    if (newSession) this.channelService.init(channelsTypes)
    return {...this.settingsService.current, newSession}
  }

  private async _sendRequest() {
    const {command} = this.settingsService.current
    await this.portService.sendData([command])
  }

  async getOnce() {
    await this._oneRequest()
    const {responseValuesForEachChannel} = this.settingsService.current
    return this.channelService.getLastChannelPoints(responseValuesForEachChannel)
  }

  private async _oneRequest() {
    this.portService.buffer = []
    const getLen = () => this.portService.buffer.length
    const {expectedLength, timeout, responseValuesForEachChannel} = this.settingsService.current

    await this._sendRequest()
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
      if (this._cycle.enable) throw new Error('Cycle request already started.')
      this._cycle.enable = true
      const errorsCount = this.logService.getErrorsCount()
      await this._cycleRequest(this._cycle)
      if (this.logService.getErrorsCount() > errorsCount) {
        this._cycle.enable = false
        throw new Error('There are some log occurred. See log for details...')
      }
    } else { // stop
      if (!this._cycle.enable) throw new Error('Cycle request not running.')
      this._cycle.enable = false
    }
  }

  private async _cycleRequest({enable}) {
    if (!enable) return;
    try {
      await this._oneRequest()
    } catch (e) {
      this.logService.error(e.message)
    }
    try {
      const {cycleRequestFreq} = this.settingsService.current
      setTimeout(async () => await this._cycleRequest(this._cycle), cycleRequestFreq)
    } catch (e) {
      this._cycle.enable = false
      this.logService.error(e.message)
    }
  }
}
