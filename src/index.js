import express from 'express'

const PORT = 11148;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.query);
  res.status(200).json('ComGraph server working')
})
app.post('/post', (req, res) => {
  console.log(req.body);
  res.status(200).json('ok')
})

app.listen(PORT, () => console.log(`ComGraph server started on port ${PORT}`))