import {Injectable} from '@nestjs/common';
import {PortSettingsDto} from "./dto/port-settings.dto";
import {SerialPort} from 'serialport';
import {LogService} from "../log/log.service";

interface IConnection {
  port: SerialPort,
  reconnect: boolean
}

@Injectable()
export class PortService {
  constructor(
    private logService: LogService
  ) {}

  private settings: PortSettingsDto
  private connection: IConnection = {
    port: undefined,
    reconnect: false
  }

  buffer: number[] = []

  async getList() {
    return await SerialPort.list()
  }

  getStatus() {
    const {port, reconnect} = this.connection
    return {
      path: port?.path,
      baudRate: port?.baudRate,
      isOpen: port?.isOpen,
      reconnect
    }
  }

  disconnect() {
    this.connection.reconnect = false
    const {port} = this.connection
    port?.close()
    port?.destroy()
  }

  connect(settings: PortSettingsDto) {
    this.settings = settings
    const {path, baudRate} = this.settings
    this.disconnect()
    this.connection.port = new SerialPort({path, baudRate, autoOpen: false})
    const {port} = this.connection
    port.on('data', this.onDataReceived)
    port.on('error', (e) => this.logService.error(e.message));
    this.connection.reconnect = true
    this.tryToConnect(this.connection)
  }

  private onDataReceived = (data: Buffer) => { // callback
    this.buffer.push(...data)
  }

  private tryToConnect({port, reconnect}: IConnection) {
    if (!reconnect) return;
    setTimeout(() => {this.tryToConnect(this.connection)}, 1000)
    if (!port?.isOpen) port?.open((e) => {
      if (e) this.logService.error(e.message)
      else this.logService.log(`Connected to ${port.path} (${port.baudRate})`)
    })
  }

  sendData(data: number[]): Promise<boolean> {
    const {port} = this.connection
    return new Promise((resolve, reject) => {
      if (!port?.isOpen) reject(new Error('Not connected to the port'))
      port?.write(data, (e) => {
        if (e) reject(e)
        this.logService.log(`Data sent: ${data}`)
        resolve(true)
      })
    })
  }
}
