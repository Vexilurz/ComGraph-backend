import {Controller, Get} from '@nestjs/common';
import {Status, StatusService} from "./status.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Status')
@Controller('/status')
export class StatusController {
  constructor(private statusService: StatusService) {
  }

  @ApiOperation({summary: 'Get status'})
  @ApiResponse({status: 200, type: Status})
  @Get('/')
  getStatus() {
    return this.statusService.getStatus()
  }
}
