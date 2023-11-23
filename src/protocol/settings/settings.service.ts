import { Injectable } from '@nestjs/common';
import {ProtocolSettingsDto} from "../dto/protocol-settings.dto";
import {areArraysIdentical} from "../../shared/lib/areArraysIdentical";
import {NumbersService} from "../../numbers/numbers.service";

export interface ISettings {
  command: number;
  timeout: number;
  cycleRequestFreq: number;
  channelsTypes: string[];
  responseValuesForEachChannel: number;
  expectedLength: number;
}

@Injectable()
export class SettingsService {
  constructor(private numbersService: NumbersService) {}

  readonly current: ISettings = {
    command: 0,
    timeout: 3000,
    cycleRequestFreq: 500,
    channelsTypes: [],
    responseValuesForEachChannel: 1,
    expectedLength: 0
  }

  get = () => this.current

  set(dto: ProtocolSettingsDto) {
    const {command, timeout, cycleRequestFreq, channelsTypes, responseValuesForEachChannel} = dto
    let {newSession} = dto
    let needToRecalcExpectedLength = false

    if (command && command > -1 && command < 256) this.current.command = command
    else throw new Error(`Command set error: ${command}. keep ${this.current.command}`)

    if (timeout && timeout > 0) this.current.timeout = timeout
    else throw new Error(`Timeout set error: ${timeout}. keep ${this.current.timeout}`)

    if (cycleRequestFreq && cycleRequestFreq > 0) this.current.cycleRequestFreq = cycleRequestFreq
    else throw new Error(`cycleRequestFreq set error: ${cycleRequestFreq}. keep ${this.current.cycleRequestFreq}`)

    if (responseValuesForEachChannel && responseValuesForEachChannel > 0) {
      if (this.current.responseValuesForEachChannel != responseValuesForEachChannel)
        needToRecalcExpectedLength = true
      this.current.responseValuesForEachChannel = responseValuesForEachChannel
    }
    else
      throw new Error(`responseValuesForEachChannel set error: ${responseValuesForEachChannel}
. keep ${this.current.responseValuesForEachChannel}`)

    if (
      channelsTypes && channelsTypes.length > 0 &&
      !areArraysIdentical(channelsTypes, this.current.channelsTypes)
    ) {
      this.current.channelsTypes = channelsTypes
      needToRecalcExpectedLength = true
      newSession = true
    }

    if (needToRecalcExpectedLength) {
      const length = this.current.channelsTypes
        .map(typeName => this.numbersService.getLength(typeName))
        .reduce((acc, val) => acc + val, 0)
      this.current.expectedLength = length * this.current.responseValuesForEachChannel
    }

    return {newSession}
  }
}
