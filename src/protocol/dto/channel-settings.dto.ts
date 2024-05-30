import {ApiProperty} from "@nestjs/swagger";

export class ChannelSettingsDto {
  @ApiProperty({example: 'Ch1', description: 'Channel name'})
  readonly name: string;

  @ApiProperty({example: 'Int32', description: 'Channel type'})
  readonly type: string;
}