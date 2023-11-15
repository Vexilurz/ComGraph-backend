import {Injectable} from '@nestjs/common';
import {PortSettingsDto} from "./dto/port-settings.dto";
import {FilesService} from "../files/files.service";
import {SerialPort} from 'serialport';

@Injectable()
export class PortService {
  constructor(private fileService: FilesService) {}

  _port: SerialPort

  async getList() {
    try {
      const ports = await SerialPort.list()
      return ports
    } catch (e) {
      throw new Error(`PortService.getExisting error: ${e.message}`)
    }
  }

  _disconnect(port: SerialPort) {
    return new Promise((resolve, reject) => {
      if (!this._port?.isOpen)
        resolve(true)
      port.close((err) => {
        resolve(err ? err : true)
      });
    });
  }

  async connect(dto: PortSettingsDto) {
    try {
      const {path, baudRate} = dto
      await this._disconnect(this._port)
      this._port = new SerialPort({path, baudRate})
      return new Promise((resolve, reject) => {
        this._port.on('open', () => {
          resolve(`Connected to ${path}`);
        });
        this._port.on('error', (err) => {
          reject(err);
        });
      });
    } catch (e) {
      throw new Error(`PortService.connect error: ${e.message}`)
    }
  }

}
