import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  async saveFile(names: string, data: Array<Array<number>>): Promise<string> {
    const date = (new Date(Date.now())).toISOString().replace(/[-:T.]/g, '_');
    const fileName = `ComGraph_${date}.csv`;
    const filePath = path.resolve(__dirname, '..', 'static')
    const file = path.join(filePath, fileName)
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, {recursive: true})
    }
    const buf = await new Promise<string>((res, rej) => {
      let s = names + '\n'
      for (let i = 0; i < data[0].length; i++) {
        for (let j = 0; j < data.length; j++) {
          s += data[j][i].toString()
          if (j < data.length-1) s += ';'
        }
        s += '\n'
      }
      res(s)
    })
    await fs.writeFile(file, buf, {flag: 'w'}, (err) => {
      if (err) throw err
    })
    return fileName
  }
}