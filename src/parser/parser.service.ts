import { Injectable } from '@nestjs/common';
import {NumbersService, NumberKind} from "../numbers/numbers.service";

@Injectable()
export class ParserService {
  constructor(private numbersService: NumbersService) {}

  littleEndian = false

  getValueFromRaw(rawValue: Uint8Array, kind: NumberKind): number {
    const dataView = new DataView(rawValue.buffer)
    const {littleEndian} = this
    switch (kind) {
      case NumberKind.Int32:
        return dataView.getInt32(0, littleEndian);
      case NumberKind.Int24:
        return this._getInt24(rawValue, littleEndian, true)
      case NumberKind.Int16:
        return dataView.getInt16(0, littleEndian);
      case NumberKind.Int8:
        return dataView.getInt8(0);
      case NumberKind.UInt32:
        return dataView.getUint32(0, littleEndian);
      case NumberKind.UInt24:
        return this._getInt24(rawValue, littleEndian, false)
      case NumberKind.UInt16:
        return dataView.getUint16(0, littleEndian);
      case NumberKind.UInt8:
        return dataView.getUint8(0);
      case NumberKind.Float32:
        return dataView.getFloat32(0, littleEndian);
    }
  }

  private _getInt24(arr: Uint8Array, littleEndian: boolean, sign: boolean): number {
    const dataView = new DataView(this._addExtraByte(arr, littleEndian, sign).buffer)
    return dataView.getInt32(0, littleEndian)
  }

  private _addExtraByte(arr: Uint8Array, littleEndian: boolean, sign: boolean): Uint8Array {
    const extendedArray = new Uint8Array(4);
    const offset = littleEndian ? 0 : 1
    extendedArray.set(arr, offset)
    if (sign) { // sxt
      const index = littleEndian ? 3 : 0
      const indexToCheck = littleEndian ? 2 : 1
      extendedArray[index] = (extendedArray[indexToCheck] & 0x80) > 0 ? 0xFF : 0x00
    }
    return extendedArray
  }
}
