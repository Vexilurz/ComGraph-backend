export class ProtocolSettingsDto {
  readonly command: number;
  readonly timeout: number;
  readonly expectedLength: number // TODO: remove this
}