import { Injectable } from '@nestjs/common';
import {ParserService} from "../parser/parser.service";
import {NumbersService, NumberType} from "../numbers/numbers.service";
import {FilesService} from "../files/files.service";
import {ChannelSettingsDto} from "../protocol/dto/channel-settings.dto";

export interface IChannel {
  name: string;
  type: NumberType;
  data: number[]
}

@Injectable()
export class DataService {
  constructor(
    private parserService: ParserService,
    private numbersService: NumbersService,
    private filesService: FilesService
  ) {}

  channels: IChannel[] = []

  init(channelTypes: ChannelSettingsDto[]) {
    this.channels = channelTypes.map((channelDTO) => this._getNew(channelDTO))
  }

  private _getNew(channelDTO: ChannelSettingsDto): IChannel {
    return {
      name: channelDTO.name,
      type: this.numbersService.getFromChannelDTO(channelDTO),
      data: []
    }
  }

  getSessionLength() { // TODO: it's crunch now...
    return this.channels[0] ? this.channels[0].data.length : -1
  }

  async parseData(data: number[], pointsCount: number) { // TODO: неудачное название аргумента
    for (let j = 0; j < pointsCount; j++) {
      for (let i = 0; i < this.channels.length; i++) {
        const channel = this.channels[i] // TODO: сначала буферизнуть, проверить нет ли ошибок в конце, и только потом сложить сюды
        const {length} = channel.type
        if (data.length < length)
          throw new Error(`Parse error. Buffer: [${data}]; need ${length} bytes. (p${j},ch${i})`)
        const rawValue = new Uint8Array(data.splice(0, length))
        channel.data.push(this.parserService.getValueFromRaw(rawValue, channel.type.kind))
      }
    }
    if (data.length > 0) throw new Error(`Extra bytes in buffer: ${data.length}`)
    // TODO: не ложить ничего в каналы, если чего то нехватает или лишку!!!
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

  async saveSession() {
    const names = this.channels.map(ch => ch.name).join(';')
    const data = this.channels.map((ch) => ch.data)
    return await this.filesService.saveFile(names, data)
  }
}
