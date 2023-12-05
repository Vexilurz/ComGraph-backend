import {ApiProperty} from "@nestjs/swagger";

export class ProtocolSettingsDto {
  @ApiProperty({example: 2, description: 'Byte to send before request'})
  command: number;

  @ApiProperty({example: 1000, description: 'Timeout of waiting answer, ms'})
  timeout: number;

  @ApiProperty({example: 100, description: 'Cycle request frequency, ms'})
  cycleRequestFreq: number;

  @ApiProperty({example: ["UInt32", "Int8"], description: 'Receiving channels types'})
  channelsTypes: string[];

  @ApiProperty({example: 1, description: 'Count of receiving values for each channel'})
  responseValuesForEachChannel: number;

  @ApiProperty({example: false, description: 'Numbers interpretation: LE or BE'})
  littleEndian: boolean;

  @ApiProperty({example: -1, description: 'This value is calculated automatically.'})
  expectedLength?: number;

  @ApiProperty({example: true, description: 'Start new session when send new settings?'})
  newSession?: boolean
}