import { Injectable } from '@nestjs/common';

export enum NumberTypeName {
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

export interface NumberType {
  name: NumberTypeName;
  length: number
}

@Injectable()
export class NumbersService {
  readonly numberTypes: NumberType[] = []

  constructor() {
    this._addType(NumberTypeName.Int32, 4)
    this._addType(NumberTypeName.Int24, 3)
    this._addType(NumberTypeName.Int16, 2)
    this._addType(NumberTypeName.Int8, 1)
    this._addType(NumberTypeName.UInt32, 4)
    this._addType(NumberTypeName.UInt24, 3)
    this._addType(NumberTypeName.UInt16, 2)
    this._addType(NumberTypeName.UInt8, 1)
    this._addType(NumberTypeName.Float32, 4)
  }

  private _addType(name: NumberTypeName, length: number) {
    this.numberTypes.push({name, length})
  }

  getSupported() {
    return this.numberTypes
  }

  getFromString(name: string): NumberType {
    const res = this.numberTypes.find(value => value.name == name)
    if (!res) throw new Error(`Can't find number type '${name}'`)
    return res
  }

  getLength(name: string): number {
    return this.getFromString(name).length
  }
}
