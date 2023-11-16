import {Injectable} from '@nestjs/common';
import {PortSettingsDto} from "./dto/port-settings.dto";
import {FilesService} from "../files/files.service";
import {SerialPort} from 'serialport';
import {ProtocolSettingsDto} from "./dto/protocol-settings.dto";

@Injectable()
export class PortService {
  private port: SerialPort
  private settings: ProtocolSettingsDto
  private portErrors = []
  private dataBuffer = []
  private isGetOnce = false

  constructor(private fileService: FilesService) {}

  async getList() {
    return await SerialPort.list()
  }

  getErrors = () => {
    const errors = this.portErrors
    this.portErrors = []
    return errors
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      if (!this.port?.isOpen) resolve('Port was not open...')
      this.port.close((err) => {
        if (err) reject(err)
        resolve('Disconnected.')
      });
    });
  }

  async connect(dto: PortSettingsDto) {
    const {path, baudRate} = dto
    await this.disconnect()
    this.port = new SerialPort({path, baudRate, autoOpen: false})
    this.port.on('data', this.onData)
    this.port.on('error', (err) => {
      const {message} = err
      const date = (new Date(Date.now())).toUTCString()
      this.portErrors.push({message, date})
    });
    return await new Promise((resolve, reject) => {
      this.port.open((err) => {
        if (err) reject(err)
        resolve(`Connected to ${path}`)
      })
    });
  }

  setProtocolSettings(dto: ProtocolSettingsDto) {
    if (!dto.command) throw new Error(`Command field is undefined`)
    if (typeof(dto.command) !== "number") throw new Error(`Command is NaN!`)
    this.settings = dto
    return this.settings
  }

  onData = (data) => {
    console.log('data:', data.length, data, this.isGetOnce)
    this.dataBuffer.push(...data)
    console.log('buffer:', this.dataBuffer.length, this.dataBuffer)
  }

  getOnce() {
    return new Promise((resolve, reject) => {
      if (!this.port?.isOpen) reject(new Error('Not connected to the port'))
      this.isGetOnce = true
      this.port.write(Buffer.from([this.settings.command]), (err) => {
        if (err) reject(err)
        resolve('Request sent...')
      })
    })
  }
}
