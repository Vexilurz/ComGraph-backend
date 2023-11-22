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

  getSessionLength() {
    return this.channels[0] ? this.channels[0].data.length : -1
  }

  async parseData(pointsCount: number) {
    for (let j = 0; j < pointsCount; j++) {
      for (let i = 0; i < this.channels.length; i++) {
        const channel = this.channels[i]
        const {length} = NumberTypes[channel.type]
        if (this.buffer.length < length)
          throw new Error(`Parse error. Buffer: [${this.buffer}]; need ${length} bytes. (p${j},ch${i})`)
        const rawValue = new Uint8Array(this.buffer.splice(0, length))
        channel.addPoint(rawValue)
      }
    }
    if (this.buffer.length > 0) throw new Error(`Extra bytes in buffer: ${this.buffer.length}`)
  }

  getLastChannelPoints(count: number) {
    const res = []
    for (let i = 0; i < this.channels.length; i++) {
      const channel = this.channels[i]
      res.push(channel.getLastPoints(count))
    }
    return res
  }
}
