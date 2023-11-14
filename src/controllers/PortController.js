class PortController {
  async getExisting(req, res) {
    try {
      res.json('okok')
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new PortController()