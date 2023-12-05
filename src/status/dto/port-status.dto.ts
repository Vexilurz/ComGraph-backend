import {ApiProperty} from "@nestjs/swagger";

export class PortStatusDto {
  @ApiProperty({example: 'COM1', description: 'Port name'})
  path?: string;

  @ApiProperty({example: 115200, description: 'Port baud rate'})
  baudRate?: number;

  @ApiProperty({example: true, description: 'Is port open?'})
  isOpen?: boolean;

  @ApiProperty({example: true, description: 'Trying to connect/reconnect timer enabled'})
  reconnect: boolean;
}