import { Injectable } from '@nestjs/common';
import {FilesService} from "../files/files.service";
import {Channel} from "./types/Channel";
import {NumberTypeName} from "./types/NumberTypes";

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
}
