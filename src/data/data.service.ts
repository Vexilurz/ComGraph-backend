import { Injectable } from '@nestjs/common';
import {FilesService} from "../files/files.service";
import {Channel} from "./types/Channel";
import {NumberTypeName, NumberTypes} from "./types/NumberTypes";

@Injectable()
export class DataService {
  constructor(private filesService: FilesService) {}

  buffer: number[] = []
  channels: Channel[] = []

  // callback for com-port data
  onDataReceived = (data: Buffer) => {
    this.buffer.push(...data)
  }

  initChannels(channelTypes: NumberTypeName[]) {
    this.channels = channelTypes.map((name) => new Channel(name))
  }

  getChannelsInfo() {
    const type = this.channels.map((channel) => channel.type)
    const count = this.channels.map((channel) => channel.data.length)
    return {type, count}
  }

  async parseData() {
    for (let i = 0; i < this.channels.length; i++) {
      const channel = this.channels[i]
      const {length} = NumberTypes[channel.type]
      if (this.buffer.length < length)
        throw new Error(`Parse error. [${this.buffer}], need length: ${length}`)
      const rawValue = new Uint8Array(this.buffer.splice(0, length))
      channel.addPoint(rawValue)
    }
    if (this.buffer.length > 0) await this.parseData()
  }

  getLastChannelPoints(count: number) {
    const data = []
    for (let i = 0; i < this.channels.length; i++) {
      const channel = this.channels[i]
      data.push(channel.getLastPoints(count))
    }
    const info = this.getChannelsInfo()
    return {info, data}
  }
}
