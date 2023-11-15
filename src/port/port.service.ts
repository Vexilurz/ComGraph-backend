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
      throw e
    }
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      if (!this._port?.isOpen)
        resolve(true)
      this._port.close((err) => {
        if (err)
          reject(err)
        else
          resolve(true)
      });
    });
  }

  async connect(dto: PortSettingsDto) {
    try {
      const {path, baudRate} = dto
      await this.disconnect()
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
      throw e
    }
  }

}
