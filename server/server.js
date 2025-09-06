import express from 'express';
import 'dotenv/config';
import path from 'node:path';
import fs from 'fs';
const app = express();

const __dirname = import.meta.dirname;
//get port and hostname from .env
const port = process.env.PORT || 8080;
const hostname = process.env.HOSTNAME || 'localhost'; 
//allow cors for dev environment
import cors from 'cors';
const corsOptions = {
  origin: ['http://localhost:5173'],
};
app.use(cors(corsOptions));
app.use(express.json());

const staticPath = path.resolve(__dirname, '../client/dist');
console.log(`[DEBUG] Attempting to serve static files from: ${staticPath}`);

//server will automatically send index.html when client requests '/' resource
app.use(express.static(staticPath));

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
  const indexPath = path.join(staticPath, 'index.html');
  console.log(`[DEBUG] Attempting to send file: ${indexPath}`);
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Express server running at http://${hostname}:${port}`);
});
