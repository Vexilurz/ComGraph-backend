import * as fs from 'fs';
import * as path from 'path';

const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), {encoding: 'utf8'}));

export function getVersion() {
  return packageJson.version
}