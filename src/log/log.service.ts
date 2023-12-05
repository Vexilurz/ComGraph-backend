import { Injectable } from '@nestjs/common';
import {ApiProperty} from "@nestjs/swagger";

export class Message {
  @ApiProperty({example: 1, description: 'ID of message'})
  id: number;

  @ApiProperty({example: 'Connected to COM2 (115200)', description: 'Message'})
  message: string;

  @ApiProperty({example: '2023-12-05T10:10:18.643Z', description: 'Date of message'})
  date: string;
}

class MessageDTO {
  message: string;
  array: Message[];
}

export class LogReport {
  log: Message[];
  errors: Message[]
}

@Injectable()
export class LogService {
  private _MAX_LENGTH = 50
  private _id = 0
  private _messages: Message[] = []
  private _errors: Message[] = []

  getLog(): LogReport {
    const log = this._messages
    const errors = this._errors
    this._messages = []
    this._errors = []
    return {log, errors}
  }

  getErrorsCount = () => this._errors.length

  log(message: string) {
    this._addMessage({message, array: this._messages})
  }

  error(message: string) {
    this._addMessage({message, array: this._errors})
  }

  private _addMessage(dto: MessageDTO) {
    console.log(dto.message)
    dto.array.push(this._getMsgWithNowDate(dto.message))
    if (dto.array.length > this._MAX_LENGTH)
      dto.array.splice(0, dto.array.length - this._MAX_LENGTH)
  }

  private _getMsgWithNowDate(message: string): Message {
    const date = (new Date(Date.now())).toISOString()
    return {id: this._id++, message, date}
  }
}
