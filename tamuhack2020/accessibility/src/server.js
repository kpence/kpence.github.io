const mongoose = require('mongoose');
const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3030;

// TODO THIS IS INSECURE, NEED A DIFFERENT WAY
const mongouri = "mongodb+srv://troyalt:123abc@cluster0-cflhg.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongouri, { useNewUrlParser: true });
app.use(cors());
app.use(bodyParser.json());

app.post('/', (req, res) => {
  let t = req.body.t;
  //res.send(`{"MES":${t}}`)
  res.send(req.body)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));



