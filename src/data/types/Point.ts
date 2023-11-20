import {NumberTypeName} from "./NumberTypes";
import {Parser} from "./Parser";

export interface Point {
  value: number;
  rawValue: Uint8Array;
  type: NumberTypeName;
  date: number
}

export class PointFactory {
  private constructor() {}

  static getNew(rawValue: Uint8Array, type: NumberTypeName): Point {
    const value = Parser.getValueFromRaw(rawValue, type)
    return {value, rawValue, type, date: Date.now()}
  }

  static convert(point: Point, type: NumberTypeName): Point {
    const {rawValue, date} = point
    const value = Parser.getValueFromRaw(rawValue, type)
    return {value, rawValue, type, date}
  }
}