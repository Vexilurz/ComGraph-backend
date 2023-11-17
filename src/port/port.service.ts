import {Injectable} from '@nestjs/common';
import {PortSettingsDto} from "./dto/port-settings.dto";
import {SerialPort} from 'serialport';
import {DataService} from "../data/data.service";

@Injectable()
export class PortService {
  private port: SerialPort
  private portErrors = []

  constructor(private dataService: DataService) {}

  async getList() {
    return await SerialPort.list()
  }

  getErrors = () => {
    const errors = this.portErrors
    this.portErrors = []
    return errors
  }

  disconnect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.port?.isOpen) resolve(true)
      this.port.close((err) => {
        if (err) reject(err)
        this.port = undefined
        resolve(true)
      });
    });
  }

  async connect(dto: PortSettingsDto) {
    const {path, baudRate} = dto
    await this.disconnect()
    this.port = new SerialPort({path, baudRate, autoOpen: false})
    this.port.on('data', this.dataService.onDataReceived)
    this.port.on('error', (err) => {
      const {message} = err
      const date = (new Date(Date.now())).toUTCString()
      this.portErrors.push({message, date})
    });
    return new Promise((resolve, reject) => {
      this.port.open((err) => {
        if (err) reject(err)
        resolve(true)
      })
    });
  }

  sendData(data: Array<number>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.port?.isOpen) reject(new Error('Not connected to the port'))
      this.port.write(data, (err) => {
        if (err) reject(err)
        resolve(true)
      })
    })
  }
}
