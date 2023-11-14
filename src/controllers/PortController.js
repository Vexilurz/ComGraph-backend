class PortController {
  async getExisting(req, res) {
    try {
      res.json('okok')
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getByName(req, res) {
    try {
      const {name} = req.params
      res.json(`okok: ${name}`)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async connect(req, res) {
    try {
      const {name} = req.body
      if (name !== undefined)
        res.json(`connect: ${name}`)
      else
        throw "no name"
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new PortController()