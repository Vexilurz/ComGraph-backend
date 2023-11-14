import { Injectable } from '@nestjs/common';

@Injectable()
export class PortsService {
  getExisting() {
    return ['COM1', 'COM2']
  }
}
