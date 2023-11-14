class PortService {
  constructor() {
    if (PortService._instance) {
      return PortService._instance
    }
    PortService._instance = this;
  }

  async getExisting() {
    const ports = ['COM1', 'COM2']
    return ports
  }

  async getByName(name) {
    return `name: ${name}`
  }

  async connect(name) {
    return `connected to ${name}`
  }
}

export default new PortService()