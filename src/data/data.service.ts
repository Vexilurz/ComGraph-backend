import { Injectable } from '@nestjs/common';
import {FilesService} from "../files/files.service";

@Injectable()
export class DataService {
  constructor(private fileService: FilesService) {}

  dataBuffer: Array<number> = []

  onDataReceived = (data: Buffer) => {
    this.dataBuffer.push(...data)
  }
}
