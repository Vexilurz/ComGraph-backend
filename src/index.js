import express from 'express'

const PORT = 11148;

const app = express();

app.get('/', (req, res) => {
  res.status(200).json('ComGraph server working')
})

app.listen(PORT, () => console.log(`ComGraph server started on port ${PORT}`))