import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorsService {
  private errors = []
  private MAX_ERRORS = 50

  getErrors() {
    const errors = this.errors
    this.errors = []
    return errors
  }

  isErrorsExists = () => this.errors.length > 0

  addError(message: string) {
    console.error(message)
    this.errors.push(this.getMsgWithNowDate(message))
    if (this.errors.length > this.MAX_ERRORS)
      this.errors = this.errors.slice(-this.MAX_ERRORS)
  }

  private getMsgWithNowDate(message: string) {
    const date = (new Date(Date.now())).toISOString()
    return {message, date}
  }
}
