import {Injectable} from '@nestjs/common';
import {PortSettingsDto} from "./dto/port-settings.dto";
import {SerialPort} from 'serialport';
import {DataService} from "../data/data.service";
import {ErrorsService} from "../errors/errors.service";

@Injectable()
export class PortService {
  constructor(
    private dataService: DataService,
    private errorsService: ErrorsService
  ) {}

  private port: SerialPort

  private addError(message: string) {
    this.errorsService.addError('SerialPort: '+message)
  }

  async getList() {
    return await SerialPort.list()
  }

  getStatus = () => {
    return {
      path: this.port?.path,
      baudRate: this.port?.baudRate,
      isOpen: this.port?.isOpen
    }
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
      this.addError(message)
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
