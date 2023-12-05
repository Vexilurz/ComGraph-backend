import {Body, Controller, Get, HttpException, HttpStatus, Post} from '@nestjs/common';
import {PortService} from "./port.service";
import {PortSettingsDto} from "./dto/port-settings.dto";
import {ApiOperation, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RawDataDto} from "./dto/rawData.dto";

class PortInfo {
  @ApiProperty({example: 'COM1', description: 'Port name'})
  readonly path: string
}

@ApiTags('Port')
@Controller('/port')
export class PortController {
  constructor(private portsService: PortService) {}

  @ApiOperation({summary: 'Get available ports list'})
  @ApiResponse({status: 200, type: [PortInfo]})
  @Get('/list')
  async getList() {
    try {
      return await this.portsService.getList()
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiOperation({summary: 'Start timer that trying to connect to the port every 1s'})
  @ApiResponse({status: 200, type: String})
  @Post('/connect')
  connect(@Body() dto: PortSettingsDto) {
    try {
      this.portsService.connect(dto)
      return `Trying to connect to ${dto.path} every 1000ms...`
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiOperation({summary: 'Stop timer and disconnect from the port'})
  @ApiResponse({status: 200, type: String})
  @Post('/disconnect')
  disconnect() {
    try {
      this.portsService.disconnect()
      return 'Disconnected.'
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiOperation({summary: 'Get raw data buffer. Clears buffer'})
  @ApiResponse({status: 200, type: RawDataDto})
  @Get('/raw')
  getRaw() {
    return this.portsService.getRaw()
  }
}
