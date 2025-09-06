import express from 'express';
import 'dotenv/config';
import path from 'node:path';
import fs from 'fs';
const app = express();

const __dirname = import.meta.dirname;
//get port and hostname from .env
const port = process.env.PORT || 8080;
//allow cors for dev environment
import cors from 'cors';
const corsOptions = {
  origin: ['http://localhost:5173'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(__dirname));

app.get('/api/messages', (req, res) => {
  fs.readFile('./messages.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file: ', err);
      return;
    }
    res.status(200).json(data);
  });
});

app.post('/api/new', (req, res) => {
  fs.readFile('./messages.json', 'utf8', (err, data) => {
    let messagesArray = JSON.parse(data);
    messagesArray.push(req.body);
    let messagesData = JSON.stringify(messagesArray) 
    fs.writeFile('./messages.json', messagesData, (err) => {
      if (err) throw err;
    });
  });
  
  res.status(201).end();
});

app.get('/{*splat}', (req, res) => {
  const indexPath = path.join(__dirname, './index.html');
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Express server running at https://valuable-lethia-calebl42-00b31e2a.koyeb.app:${port}`);
});
