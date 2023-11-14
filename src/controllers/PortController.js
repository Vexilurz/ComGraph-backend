import PortService from "../services/PortService.js";

class PortController {
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
      res.json(PortService.getByName(name))
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async connect(req, res) {
    try {
      const {name} = req.body
      res.json(PortService.connect(name))
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new PortController()