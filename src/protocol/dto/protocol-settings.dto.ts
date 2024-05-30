import {ApiProperty} from "@nestjs/swagger";
import {ChannelSettingsDto} from "./channel-settings.dto";

export class ProtocolSettingsDto {
  @ApiProperty({example: 2, description: 'Byte to send before request'})
  command: number;

  @ApiProperty({example: 1000, description: 'Timeout of waiting answer, ms'})
  timeout: number;

  @ApiProperty({example: 100, description: 'Cycle request frequency, ms'})
  cycleRequestFreq: number;

  @ApiProperty({example: [{name: 'Ch1', type: 'Int32'},{name: 'Ch2', type: 'Float'}], description: 'Receiving channels types'})
  channelsTypes: ChannelSettingsDto[];

  @ApiProperty({example: 1, description: 'Count of receiving values for each channel'})
  responseValuesForEachChannel: number;

  @ApiProperty({example: false, description: 'Numbers interpretation: LE or BE'})
  littleEndian: boolean;

  @ApiProperty({example: -1, description: 'This value is calculated automatically.'})
  expectedLength?: number;

  @ApiProperty({example: true, description: 'Start new session when send new settings?'})
  newSession?: boolean
}