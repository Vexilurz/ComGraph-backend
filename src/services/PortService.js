class PortService {
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