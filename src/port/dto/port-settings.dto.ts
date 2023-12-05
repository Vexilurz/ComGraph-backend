import {ApiProperty} from "@nestjs/swagger";

export class PortSettingsDto {
  @ApiProperty({example: 'COM1', description: 'Port name'})
  readonly path: string;

  @ApiProperty({example: 115200, description: 'BaudRate'})
  readonly baudRate: number
}