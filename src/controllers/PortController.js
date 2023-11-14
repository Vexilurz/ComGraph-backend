import PortService from "../services/PortService.js";

class PortController {
  constructor() {
    if (PortController._instance) {
      return PortController._instance
    }
    PortController._instance = this;
  }

  async getExisting(req, res) {
    try {
      const ports = await PortService.getExisting()
      res.json(ports)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getByName(req, res) {
    try {
      const {name} = req.params
      const status = await PortService.getByName(name)
      res.json(status)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async connect(req, res) {
    try {
      const {name} = req.body
      const status = await PortService.connect(name)
      res.json(status)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new PortController()