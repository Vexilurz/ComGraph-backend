import {NumberTypeName} from "./NumberTypes";
import {Parser} from "./Parser";

export class Channel {
  readonly type: NumberTypeName
  data: number[]

  constructor(type: NumberTypeName) {
    if (!Object.values(NumberTypeName).includes(type))
      throw new Error(`Wrong channel type: ${type}`)
    this.type = type
    this.data = []
  }

  addPoint(rawValue: Uint8Array) {
    this.data.push(Parser.getValueFromRaw(rawValue, this.type))
  }

  getLastPoints(count: number) {
    return this.data.slice(-count)
  }
}