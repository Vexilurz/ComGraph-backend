import { Injectable } from '@nestjs/common';
import {FilesService} from "../files/files.service";

@Injectable()
export class DataService {
  constructor(private fileService: FilesService) {}

  private dataBuffer: Array<number> = []

  onDataReceived = (data: Buffer) => {
    console.log('data:', data.length, data)
    this.dataBuffer.push(...data)
    console.log('buffer:', this.dataBuffer.length, this.dataBuffer)
  }
}
