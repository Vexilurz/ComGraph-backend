export class ProtocolSettingsDto {
  readonly command: number;
  readonly timeout: number;
  readonly cycleRequestFreq: number;
  readonly channelsTypes: string[];
  readonly responseValuesForEachChannel: number;
  readonly newSession: boolean
}