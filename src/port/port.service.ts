import { Injectable } from '@nestjs/common';
import {PortSettingsDto} from "./dto/port-settings.dto";
import {FilesService} from "../files/files.service";
import { SerialPort } from 'serialport';

@Injectable()
export class PortService {
  constructor(private fileService: FilesService) {

  }

  async getExisting() {
    const ports = await SerialPort.list()
    return ports
  }

  async getPort(name: string) {
    return `Status of ${name}`
  }

  async connect(dto: PortSettingsDto) {
    // TODO: connect to port
    return `Connected to ${dto.name} ${dto.baudrate}`
  }

}
