import * as uuid from 'uuid'
import * as path from 'path'

class FileService {
  constructor() {
    if (FileService._instance) {
      return FileService._instance
    }
    FileService._instance = this;
  }

  async saveFile(file) {
    try {
      const fileName = uuid.v5() + '.txt'
      const filePath = path.resolve('static', 'data', fileName)
      // TODO: save file
      return filePath
    } catch (e) {
      console.error(e)
    }
  }
}

export default new FileService()