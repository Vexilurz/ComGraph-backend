import { Injectable } from '@nestjs/common';
import {PortSettingsDto} from "./dto/port-settings.dto";
// import {FilesService} from "../../files/files.service";

@Injectable()
export class PortService {
  // constructor(private fileService: FilesService) {}

  async getExisting() {
    return ['COM1', 'COM2']
  }

  async getPort(name: string) {
    return `Status of ${name}`
  }

  async connect(dto: PortSettingsDto) {
    // TODO: connect to port
    return `Connected to ${dto.name} ${dto.baudrate}`
  }

}
