import {NumberTypeName, NumberTypes} from "../shared/types/NumberTypes";
import {ProtocolSettingsDto} from "./dto/protocol-settings.dto";
import {areArraysIdentical} from "../shared/lib/areArraysIdentical";

export class ProtocolSettings {
  command = -1;
  timeout = 3000;
  cycleRequestFreq = 500;
  channelsTypes: NumberTypeName[] = []
  responseValuesForEachChannel = 0;
  expectedLength = 0

  set(dto: ProtocolSettingsDto) {
    const {command, timeout, cycleRequestFreq, channelsTypes, responseValuesForEachChannel} = dto
    let {newSession} = dto
    let needToRecalcExpectedLength = false

    if (command && command > -1 && command < 256) this.command = command
    else throw new Error(`Command set error: ${command}. keep ${this.command}`)

    if (timeout && timeout > 0) this.timeout = timeout
    else throw new Error(`Timeout set error: ${timeout}. keep ${this.timeout}`)

    if (cycleRequestFreq && cycleRequestFreq > 0) this.cycleRequestFreq = cycleRequestFreq
    else throw new Error(`cycleRequestFreq set error: ${cycleRequestFreq}. keep ${this.cycleRequestFreq}`)

    if (responseValuesForEachChannel && responseValuesForEachChannel > 0) {
      if (this.responseValuesForEachChannel != responseValuesForEachChannel)
        needToRecalcExpectedLength = true
      this.responseValuesForEachChannel = responseValuesForEachChannel
    }
    else
      throw new Error(`responseValuesForEachChannel set error: ${responseValuesForEachChannel}. keep ${this.responseValuesForEachChannel}`)

    if (
      channelsTypes && channelsTypes.length > 0 &&
      !areArraysIdentical(channelsTypes, this.channelsTypes)
    ) {
      this.channelsTypes = channelsTypes
      needToRecalcExpectedLength = true
      newSession = true
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