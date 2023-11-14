import {Injectable} from "@nestjs/common";

@Injectable()
export class AppService {
  getPorts() {
    return ['COM1', 'COM2']
  }
}