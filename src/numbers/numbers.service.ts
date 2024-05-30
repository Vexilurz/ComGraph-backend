import { Injectable } from '@nestjs/common';
import {ApiProperty} from "@nestjs/swagger";
import {ChannelSettingsDto} from "../protocol/dto/channel-settings.dto";

export enum NumberKind {
  Int32 = 'Int32',
  Int24 = 'Int24',
  Int16 = 'Int16',
  Int8 = 'Int8',
  UInt32 = 'UInt32',
  UInt24 = 'UInt24',
  UInt16 = 'UInt16',
  UInt8 = 'UInt8',
  Float32 = 'Float32'
}

export class NumberType {
  @ApiProperty({example: 'Int32', description: 'Type name'})
  kind: NumberKind;

  @ApiProperty({example: 4, description: 'Length of number in bytes'})
  length: number
}

@Injectable()
export class NumbersService {
  readonly numberTypes: NumberType[] = []

  constructor() {
    this._addType(NumberKind.Int32, 4)
    this._addType(NumberKind.Int24, 3)
    this._addType(NumberKind.Int16, 2)
    this._addType(NumberKind.Int8, 1)
    this._addType(NumberKind.UInt32, 4)
    this._addType(NumberKind.UInt24, 3)
    this._addType(NumberKind.UInt16, 2)
    this._addType(NumberKind.UInt8, 1)
    this._addType(NumberKind.Float32, 4)
  }

  private _addType(name: NumberKind, length: number) {
    this.numberTypes.push({kind: name, length})
  }

  getSupported() {
    return this.numberTypes
  }

  getFromChannelDTO(channelDTO: ChannelSettingsDto): NumberType {
    if (!channelDTO.name || !channelDTO.type) throw new Error(`Channels must be declared like {name: 'Ch1', type: 'Int32'}`)
    const res = this.numberTypes.find(value => value.kind == channelDTO.type)
    if (!res) throw new Error(`Can't find number type '${channelDTO.type}' of channel '${channelDTO.name}'`)
    return res
  }

  getLength(channelDTO: ChannelSettingsDto): number {
    return this.getFromChannelDTO(channelDTO).length
  }
}
