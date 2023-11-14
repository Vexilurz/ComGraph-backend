import Router from 'express'
import PortController from "./controllers/PortController.js";

const router = new Router()

router.get('/ports', PortController.getExisting)
router.get('/port/:name', PortController.getByName)
router.post('/connect', PortController.connect)

export default router