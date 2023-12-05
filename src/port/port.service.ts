import {Injectable} from '@nestjs/common';
import {PortSettingsDto} from "./dto/port-settings.dto";
import {SerialPort} from 'serialport';
import {LogService} from "../log/log.service";
import {RawDataDto} from "./dto/raw-data.dto";

interface IConnection {
  port: SerialPort,
  reconnect: boolean
}

@Injectable()
export class PortService {
  constructor(
    private logService: LogService
  ) {}

  private _settings: PortSettingsDto
  private _connection: IConnection = {
    port: undefined,
    reconnect: false
  }

  buffer: number[] = []

  async getList() {
    return await SerialPort.list()
  }

  getStatus() {
    const {port, reconnect} = this._connection
    return {
      path: port?.path,
      baudRate: port?.baudRate,
      isOpen: port?.isOpen,
      reconnect
    }
  }

  disconnect() {
    this._connection.reconnect = false
    const {port} = this._connection
    port?.close()
    port?.destroy()
  }

  connect(settings: PortSettingsDto) {
    this._settings = settings
    const {path, baudRate} = this._settings
    this.disconnect()
    this._connection.port = new SerialPort({path, baudRate, autoOpen: false})
    const {port} = this._connection
    port.on('data', this._onDataReceived)
    port.on('error', (e) => this.logService.error(e.message));
    this._connection.reconnect = true
    this._tryToConnect(this._connection)
  }

  private _onDataReceived = (data: Buffer) => { // callback
    this.buffer.push(...data)
  }

  private _tryToConnect({port, reconnect}: IConnection) {
    if (!reconnect) return;
    setTimeout(() => {this._tryToConnect(this._connection)}, 1000)
    if (!port?.isOpen) port?.open((e) => {
      if (e) this.logService.error(e.message)
      else this.logService.log(`Connected to ${port.path} (${port.baudRate})`)
    })
  }

  sendData(data: number[]): Promise<boolean> {
    const {port} = this._connection
    return new Promise((resolve, reject) => {
      if (!port?.isOpen) reject(new Error('Not connected to the port'))
      port?.write(data, (e) => {
        if (e) reject(e)
        this.logService.log(`Data sent: ${data}`)
        resolve(true)
      })
    })
  }

  getRaw(): RawDataDto {
    const res = {
      text: String.fromCharCode(...this.buffer),
      raw: this.buffer
    }
    this.buffer = []
    return res
  }
}
