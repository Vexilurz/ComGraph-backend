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
  private MAX_LENGTH = 50
  private id = 0
  private messages: Message[] = []
  private errors: Message[] = []

  getLog(): LogReport {
    const log = this.messages
    const errors = this.errors
    this.messages = []
    this.errors = []
    return {log, errors}
  }

  getErrorsCount = () => this.errors.length

  log(message: string) {
    this.addMessage({
      message,
      array: this.messages
    })
  }

  error(message: string) {
    this.addMessage({
      message,
      array: this.errors
    })
  }

  private addMessage(dto: MessageDTO) {
    console.log(dto.message)
    dto.array.push(this.getMsgWithNowDate(dto.message))
    if (dto.array.length > this.MAX_LENGTH)
      dto.array.splice(0, dto.array.length - this.MAX_LENGTH)
  }

  private getMsgWithNowDate(message: string): Message {
    const date = (new Date(Date.now())).toISOString()
    return {id: this.id++, message, date}
  }
}
