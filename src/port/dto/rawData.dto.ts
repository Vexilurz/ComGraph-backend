import {ApiProperty} from "@nestjs/swagger";

export class RawDataDto {
  @ApiProperty({example: "qwe", description: 'Text representation of buffer'})
  readonly text: string

  @ApiProperty({example: [113, 119, 101], description: 'Array of received raw data in buffer'})
  readonly raw: number[];
}