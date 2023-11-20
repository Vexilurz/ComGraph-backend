import {NumberTypeName} from "./NumberTypes";
import {Point} from "./Point";

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
}