import { Injectable } from '@nestjs/common';
import {PortService} from "../port/port.service";
import {ProtocolService} from "../protocol/protocol.service";
import {LogService, Message} from "../log/log.service";
import {getVersion} from "../shared/lib/packageJsonParser";
import {ApiProperty} from "@nestjs/swagger";
import {PortStatusDto} from "./dto/port-status.dto";
import {ProtocolStatusDto} from "./dto/protocol-status.dto";

class Info {
  @ApiProperty({example: '1.0.0', description: 'Version of API'})
  version: string
}

export class Status {
  @ApiProperty({description: 'Common info'})
  info: Info;

  @ApiProperty({description: 'Port status'})
  port: PortStatusDto;

  @ApiProperty({description: 'Protocol status'})
  protocol: ProtocolStatusDto;

  @ApiProperty({example: [{
      "id": 0,
      "message": "Connected to COM2 (115200)",
      "date": "2023-12-05T10:10:18.643Z"
    }], description: 'Log messages'})
  log: Message[];

  @ApiProperty({example: [], description: 'Errors messages'})
  errors: Message[]
}

@Injectable()
export class StatusService {
  constructor(
    private portService: PortService,
    private protocolService: ProtocolService,
    private logService: LogService
  ) {}

  private _info: Info = {
    version: getVersion()
  }

  getStatus(): Status {
    const {log, errors} = this.logService.getLog()
    return {
      info: this._info,
      port: this.portService.getStatus(),
      protocol: this.protocolService.getStatus(),
      log, errors
    } as Status
  }
}
