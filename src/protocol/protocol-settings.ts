import {NumberTypeName, NumberTypes} from "../data/types/NumberTypes";
import {ProtocolSettingsDto} from "./dto/protocol-settings.dto";
import {areArraysIdentical} from "../shared/lib/areArraysIdentical";

export interface IProtocolSettings {
  readonly command: number;
  readonly responseValuesForEachChannel: number;
  readonly timeout: number;
  readonly cycleRequestFreq: number;
  readonly expectedLength: number;
  readonly channelsTypes: Array<NumberTypeName>
}

export class ProtocolSettings implements IProtocolSettings {
  command = -1;
  responseValuesForEachChannel = 0;
  timeout = 3000;
  cycleRequestFreq = 500;
  expectedLength = 0
  channelsTypes = []

  set(dto: ProtocolSettingsDto) {
    const {command, timeout, cycleRequestFreq, channels, responseValuesForEachChannel} = dto
    let {newSession} = dto
    let needToRecalcExpectedLength = false

    if (command && command > -1 && command < 256) this.command = command
    else throw new Error(`Command set error: ${command}, was ${this.command}`)

    if (timeout && timeout > 0) this.timeout = timeout
    else throw new Error(`Timeout set error: ${timeout}, was ${this.timeout}`)

    if (cycleRequestFreq && cycleRequestFreq > 0) this.cycleRequestFreq = cycleRequestFreq
    else throw new Error(`cycleRequestFreq set error: ${cycleRequestFreq}, was ${this.cycleRequestFreq}`)

    if (responseValuesForEachChannel && responseValuesForEachChannel > 0) {
      if (this.responseValuesForEachChannel != responseValuesForEachChannel)
        needToRecalcExpectedLength = true
      this.responseValuesForEachChannel = responseValuesForEachChannel
    }
    else
      throw new Error(`responseValuesForEachChannel set error: ${responseValuesForEachChannel}, was ${this.responseValuesForEachChannel}`)

    if (channels && channels.length > 0 && !areArraysIdentical(channels, this.channelsTypes)) {
      const isChannelsCorrect = channels
        .map((channel) => Object.values(NumberTypeName).includes(channel))
        .reduce((acc, val) => acc && val, true)
      if (isChannelsCorrect) {
        this.channelsTypes = channels
        needToRecalcExpectedLength = true
        newSession = true
      } else throw new Error(`Channels types are incorrect`)
    }

    if (needToRecalcExpectedLength) this.calcExpectedLength()

    return {newSession}
  }

  private calcExpectedLength() {
    const length = this.channelsTypes
      .map(typeName => NumberTypes[typeName].length)
      .reduce((acc, val) => acc + val, 0)
    this.expectedLength = length * this.responseValuesForEachChannel
  }
}