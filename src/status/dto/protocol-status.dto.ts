import {ApiProperty} from "@nestjs/swagger";
import {ProtocolSettingsDto} from "../../protocol/dto/protocol-settings.dto";

export class ProtocolStatusDto {
  @ApiProperty({description: 'Current protocol settings'})
  settings: ProtocolSettingsDto;

  @ApiProperty({example: true, description: 'Cycle request enabled'})
  cycle: boolean;

  @ApiProperty({example: 10, description: 'Current points in each channel'})
  sessionLength: number;
}