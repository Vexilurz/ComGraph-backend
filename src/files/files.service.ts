import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileName = 'qwe.txt';
      const filePath = path.resolve(__dirname, '..', 'static')
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      // TODO: writeFile
      fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      return fileName
    } catch (e) {
      throw new Error(`FilesService.createFile error: ${e.message}`)
    }
  }
}
