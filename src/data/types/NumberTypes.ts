export enum NumberTypeName {
  Int32 = 'Int32',
  Int24 = 'Int24',
  Int16 = 'Int16',
  Int8 = 'Int8',
  UInt32 = 'UInt32',
  UInt24 = 'UInt24',
  UInt16 = 'UInt16',
  UInt8 = 'UInt8',
  Float32 = 'Float32'
}

export interface NumberTypeInfo {
  length: number;
}

export const NumberTypes: Record<NumberTypeName, NumberTypeInfo> = {
  [NumberTypeName.Int32]: {length: 4},
  [NumberTypeName.Int24]: {length: 3},
  [NumberTypeName.Int16]: {length: 2},
  [NumberTypeName.Int8]: {length: 1},
  [NumberTypeName.UInt32]: {length: 4},
  [NumberTypeName.UInt24]: {length: 3},
  [NumberTypeName.UInt16]: {length: 2},
  [NumberTypeName.UInt8]: {length: 1},
  [NumberTypeName.Float32]: {length: 4},
}