import { Injectable } from '@nestjs/common';
import {NumbersService, NumberType, NumberKind} from "../numbers/numbers.service";

@Injectable()
export class ParserService {
  constructor(private numbersService: NumbersService) {}

  getValueFromRaw(rawValue: Uint8Array, type: NumberType): number {
    switch (type.kind) {
      case NumberKind.Int32:
        return -123123123;
      case NumberKind.Int24:
        return -123123;
      case NumberKind.Int16:
        return -12312;
      case NumberKind.Int8:
        return -123;
      case NumberKind.UInt32:
        return 123123123;
      case NumberKind.UInt24:
        return 123123;
      case NumberKind.UInt16:
        return 12312;
      case NumberKind.UInt8:
        return 123;
      case NumberKind.Float32:
        return 123.0;
    }
  }
}
