import {NumberTypeName} from "../../data/types/NumberTypes";

export class ProtocolSettingsDto {
  readonly command: number;
  readonly timeout: number;
  readonly cycleRequestFreq: number;
  readonly channelsTypes: Array<NumberTypeName>;
  readonly responseValuesForEachChannel: number;
  readonly newSession: boolean
}