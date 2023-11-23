import { Injectable } from '@nestjs/common';

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

export interface NumberType {
  kind: NumberKind;
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

  getFromString(kind: string): NumberType {
    const res = this.numberTypes.find(value => value.kind == kind)
    if (!res) throw new Error(`Can't find number type '${kind}'`)
    return res
  }

  getLength(kind: string): number {
    return this.getFromString(kind).length
  }
}
