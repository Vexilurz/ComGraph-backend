import { Injectable } from '@nestjs/common';
import {PortService} from "../port/port.service";
import {ProtocolService} from "../protocol/protocol.service";
import {ErrorsService} from "../errors/errors.service";

@Injectable()
export class StatusService {
  constructor(
    private portService: PortService,
    private protocolService: ProtocolService,
    private errorsService: ErrorsService
  ) {}

  getStatus() {
    return {
      port: this.portService.getStatus(),
      protocol: this.protocolService.getStatus(),
      errors: this.errorsService.getErrors()
    }
  }
}
