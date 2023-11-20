import {NumberTypeName} from "../../data/types/NumberTypes";

export class ProtocolSettingsDto {
  readonly command: number;
  readonly responseValuesForEachChannel: number;
  readonly timeout: number;
  readonly cycleRequestFreq: number;
  readonly channels: Array<NumberTypeName>;
  readonly newSession: boolean
}