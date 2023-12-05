import { Injectable } from '@nestjs/common';
import {PortService} from "../port/port.service";
import {ProtocolService} from "../protocol/protocol.service";
import {LogService} from "../log/log.service";
import {getVersion} from "../shared/lib/packageJsonParser";

@Injectable()
export class StatusService {
  constructor(
    private portService: PortService,
    private protocolService: ProtocolService,
    private logService: LogService
  ) {}

  private _info = {
    version: getVersion()
  }

  getStatus() {
    const {log, errors} = this.logService.getLog()
    return {
      info: this._info,
      port: this.portService.getStatus(),
      protocol: this.protocolService.getStatus(),
      log, errors
    }
  }
}
