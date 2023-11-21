import {NumberTypeName} from "./NumberTypes";

export class Parser {
  private constructor() {}

  static getValueFromRaw(rawValue: Uint8Array, type: NumberTypeName): number {
    switch (type) {
      case NumberTypeName.Int32:
        return -123123123;
      case NumberTypeName.Int24:
        return -123123;
      case NumberTypeName.Int16:
        return -12312;
      case NumberTypeName.Int8:
        return -123;
      case NumberTypeName.UInt32:
        return 123123123;
      case NumberTypeName.UInt24:
        return 123123;
      case NumberTypeName.UInt16:
        return 12312;
      case NumberTypeName.UInt8:
        return 123;
      case NumberTypeName.Float32:
        return 123.0;
    }
  }
}