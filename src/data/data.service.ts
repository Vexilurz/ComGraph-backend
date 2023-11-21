import { Injectable } from '@nestjs/common';
import {FilesService} from "../files/files.service";
import {Channel} from "./types/Channel";
import {NumberTypeName, NumberTypes} from "./types/NumberTypes";

@Injectable()
export class DataService {
  constructor(private filesService: FilesService) {}

  dataBuffer: Array<number> = []
  channels: Array<Channel> = []

  onDataReceived = (data: Buffer) => {
    this.dataBuffer.push(...data)
  }

  initChannels(channelTypes: Array<NumberTypeName>) {
    this.channels = channelTypes.map((name) => new Channel(name))
  }

  getChannelsTypes() {
    return this.channels.map((channel) => channel.getType())
  }

  getInfo() {
    const channelsInfo = this.channels.map((channel) => channel.getInfo())
    return {
      bufferLen: this.dataBuffer.length,
      channels: channelsInfo
    }
  }

  async parseData(data: number[]) {
    for (let i = 0; i < this.channels.length; i++) {
      const channel = this.channels[i]
      const {length} = NumberTypes[channel.getType()]
      // if (length < data.length) throw new Error(`parsing data fail. [${data}], need len: ${length}`)
      const raw = data.splice(0, length)
      const rawValue = new Uint8Array(raw)
      channel.addPoint(rawValue)
      // console.log(rawValue, data)
    }
    if (data.length > 0) await this.parseData(data)
  }

  getLastChannelPoints(count: number) {
    let channels = []
    for (let i = 0; i < this.channels.length; i++) {
      const channel = this.channels[i]
      const type = channel.getType()
      const data = channel.getLastPoints(count)
      const totalPoints = channel.data.length
      channels.push({type, data, totalPoints})
    }
    return channels
  }
}
