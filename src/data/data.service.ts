import { Injectable } from '@nestjs/common';
import {ParserService} from "../parser/parser.service";
import {NumbersService, NumberType} from "../numbers/numbers.service";

export interface IChannel {
  type: NumberType;
  data: number[]
}

@Injectable()
export class DataService {
  constructor(
    private parserService: ParserService,
    private numbersService: NumbersService
  ) {}

  channels: IChannel[] = []

  init(channelTypes: string[]) {
    this.channels = channelTypes.map((typeName) => this._getNew(typeName))
  }

  private _getNew(typeName: string): IChannel {
    return {
      type: this.numbersService.getFromString(typeName),
      data: []
    }
  }

  getSessionLength() { // TODO: it's crunch now...
    return this.channels[0] ? this.channels[0].data.length : -1
  }

  async parseData(data: number[], pointsCount: number) { // TODO: неудачное название аргумента
    for (let j = 0; j < pointsCount; j++) {
      for (let i = 0; i < this.channels.length; i++) {
        const channel = this.channels[i]
        const {length} = channel.type
        if (data.length < length)
          throw new Error(`Parse error. Buffer: [${data}]; need ${length} bytes. (p${j},ch${i})`)
        const rawValue = new Uint8Array(data.splice(0, length))
        channel.data.push(this.parserService.getValueFromRaw(rawValue, channel.type.kind))
      }
    }
    if (data.length > 0) throw new Error(`Extra bytes in buffer: ${data.length}`)
  }

  getChannelPoints(start?: number, end?: number) {
    const res = []
    for (let i = 0; i < this.channels.length; i++) {
      const channel = this.channels[i]
      res.push(channel.data.slice(start, end))
    }
    return res
  }

  getLastChannelPoints(count: number) {
    return this.getChannelPoints(-count)
  }

  setLittleEndian(value: boolean) {
    this.parserService.littleEndian = value
  }
}