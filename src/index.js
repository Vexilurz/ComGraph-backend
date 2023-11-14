import express from 'express'
import router from "./router.js";

const PORT = 11148

const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use('/api', router)

async function startApp() {
  try {
    app.listen(PORT, () => console.log(`ComGraph server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

await startApp()