import Router from 'express'
import PortController from "./controllers/PortController.js";

const router = new Router()

router.get('/ports', PortController.getExisting)
router.get('/port/:name')
router.post('/connect/:name')

export default router