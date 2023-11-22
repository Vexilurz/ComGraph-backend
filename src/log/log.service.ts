import { Injectable } from '@nestjs/common';

export interface Message {
  id: number;
  message: string;
  date: string;
}

interface MessageDTO {
  message: string;
  array: Message[];
}

export interface LogReport {
  log: Message[],
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
