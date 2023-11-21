import {NumberTypeName} from "./NumberTypes";
import {Point, PointFactory} from "./Point";

export class Channel {
  private type: NumberTypeName
  data: Array<Point>

  constructor(type: NumberTypeName) {
    this.type = type
    this.data = []
  }

  getType() {
    return this.type
  }

  getInfo() {
    return {
      type: this.type,
      count: this.data.length
    }
  }

  addPoint(rawValue: Uint8Array) {
    this.data.push(PointFactory.getNew(rawValue, this.type))
  }

  getLastPoints(count: number) {
    return this.data.slice(-count)
  }
}